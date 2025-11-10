import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Hospital", "Clinic", "Health Center", "Private Practice"],
      default: "Clinic",
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: "Kenya",
      },
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    contact: {
      phone: String,
      email: String,
      website: String,
    },
    hours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    services: [String],
    doctors: [
      {
        name: String,
        specialization: String,
        available: Boolean,
      },
    ],
    fees: {
      consultation: Number,
      vaccination: Number,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index for location-based queries
clinicSchema.index({ coordinates: "2dsphere" });
clinicSchema.index({ name: "text", "address.city": "text" });

export default mongoose.model("Clinic", clinicSchema);