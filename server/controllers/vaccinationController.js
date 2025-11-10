import Vaccination from "../models/Vaccination.js";
import Child from "../models/Child.js";
import Reminder from "../models/Reminder.js";

// Get all vaccinations for a user's children
export const getVaccinations = async (req, res) => {
  try {
    const { status, childId, page = 1, limit = 10 } = req.query;

    // Get user's children IDs
    const children = await Child.find({ parentId: req.user._id });
    const childIds = children.map((child) => child._id);

    let query = { childId: { $in: childIds } };

    if (status) query.status = status;
    if (childId) query.childId = childId;

    const vaccinations = await Vaccination.find(query)
      .populate("childId", "name dateOfBirth gender")
      .sort({ dateAdministered: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Vaccination.countDocuments(query);

    res.status(200).json({
      success: true,
      vaccinations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create vaccination record
export const createVaccination = async (req, res) => {
  try {
    const {
      childId,
      vaccineName,
      vaccineType,
      dateAdministered,
      nextDoseDate,
      clinic,
      batchNumber,
      sideEffects,
      notes,
    } = req.body;

    // Verify child belongs to user
    const child = await Child.findOne({ _id: childId, parentId: req.user._id });
    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    const vaccination = new Vaccination({
      childId,
      vaccineName,
      vaccineType,
      dateAdministered,
      nextDoseDate,
      clinic,
      batchNumber,
      sideEffects: sideEffects || [],
      notes,
      createdBy: req.user._id,
    });

    await vaccination.save();

    // Create reminder for next dose if provided
    if (nextDoseDate) {
      const reminderDate = new Date(nextDoseDate);
      reminderDate.setDate(reminderDate.getDate() - req.user.reminderDays);

      const reminder = new Reminder({
        userId: req.user._id,
        childId,
        type: "vaccine",
        title: `Next dose: ${vaccineName}`,
        description: `Upcoming vaccine dose for ${child.name}`,
        dueDate: nextDoseDate,
        reminderDate,
        priority: "high",
        createdBy: req.user._id,
      });

      await reminder.save();
    }

    res.status(201).json({ success: true, vaccination });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update vaccination record
export const updateVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id).populate({
      path: "childId",
      match: { parentId: req.user._id },
    });

    if (!vaccination || !vaccination.childId) {
      return res
        .status(404)
        .json({ success: false, message: "Vaccination record not found" });
    }

    Object.keys(req.body).forEach((key) => {
      vaccination[key] = req.body[key];
    });

    await vaccination.save();

    res.status(200).json({ success: true, vaccination });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete vaccination record
export const deleteVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id).populate({
      path: "childId",
      match: { parentId: req.user._id },
    });

    if (!vaccination || !vaccination.childId) {
      return res
        .status(404)
        .json({ success: false, message: "Vaccination record not found" });
    }

    await Vaccination.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Vaccination record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get vaccination statistics
export const getVaccinationStats = async (req, res) => {
  try {
    const children = await Child.find({ parentId: req.user._id });
    const childIds = children.map((child) => child._id);

    const stats = await Vaccination.aggregate([
      { $match: { childId: { $in: childIds } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalVaccinations = await Vaccination.countDocuments({
      childId: { $in: childIds },
    });
    const upcomingVaccinations = await Vaccination.countDocuments({
      childId: { $in: childIds },
      status: "scheduled",
      nextDoseDate: { $gte: new Date() },
    });

    res.status(200).json({
      success: true,
      stats: {
        total: totalVaccinations,
        upcoming: upcomingVaccinations,
        byStatus: stats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};