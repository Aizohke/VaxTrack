import Clinic from "../models/Clinic.js";

// Get all clinics with filtering and pagination
export const getClinics = async (req, res) => {
  try {
    const { search, type, city, page = 1, limit = 10 } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "address.city": { $regex: search, $options: "i" } },
      ];
    }

    if (type) query.type = type;
    if (city) query["address.city"] = { $regex: city, $options: "i" };

    const clinics = await Clinic.find(query)
      .sort({ "rating.average": -1, name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Clinic.countDocuments(query);

    res.status(200).json({
      success: true,
      clinics,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get nearby clinics
export const getNearbyClinics = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5000 } = req.query; // maxDistance in meters

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const clinics = await Clinic.find({
      isActive: true,
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    }).limit(20);

    res.status(200).json({ success: true, clinics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single clinic
export const getClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res
        .status(404)
        .json({ success: false, message: "Clinic not found" });
    }

    res.status(200).json({ success: true, clinic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create clinic (admin only)
export const createClinic = async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();

    res.status(201).json({ success: true, clinic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update clinic (admin only)
export const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!clinic) {
      return res
        .status(404)
        .json({ success: false, message: "Clinic not found" });
    }

    res.status(200).json({ success: true, clinic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};