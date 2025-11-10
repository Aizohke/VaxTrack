import Child from "../models/Child.js";
import Vaccination from "../models/Vaccination.js";

// Get all children for a user
export const getChildren = async (req, res) => {
  try {
    const children = await Child.find({ parentId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, children });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single child
export const getChild = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parentId: req.user._id,
    });

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    // Get vaccination records for this child
    const vaccinations = await Vaccination.find({ childId: child._id }).sort({
      dateAdministered: -1,
    });

    res.status(200).json({
      success: true,
      child: {
        ...child.toObject(),
        vaccinations,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new child
export const createChild = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      gender,
      birthWeight,
      birthHeight,
      bloodType,
      allergies,
      medicalConditions,
      medications,
      notes,
    } = req.body;

    const child = new Child({
      parentId: req.user._id,
      name,
      dateOfBirth,
      gender,
      birthWeight,
      birthHeight,
      bloodType,
      allergies: allergies || [],
      medicalConditions: medicalConditions || [],
      medications: medications || [],
      notes,
    });

    await child.save();

    res.status(201).json({ success: true, child });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update child
export const updateChild = async (req, res) => {
  try {
    const child = await Child.findOneAndUpdate(
      { _id: req.params.id, parentId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    res.status(200).json({ success: true, child });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete child
export const deleteChild = async (req, res) => {
  try {
    const child = await Child.findOneAndDelete({
      _id: req.params.id,
      parentId: req.user._id,
    });

    if (!child) {
      return res
        .status(404)
        .json({ success: false, message: "Child not found" });
    }

    // Also delete associated vaccinations
    await Vaccination.deleteMany({ childId: child._id });

    res
      .status(200)
      .json({ success: true, message: "Child deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};