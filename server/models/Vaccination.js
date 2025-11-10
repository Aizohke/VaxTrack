import mongoose from "mongoose";

const vaccinationSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },
    vaccineName: {
      type: String,
      required: true,
      trim: true,
    },
    vaccineType: {
      type: String,
      enum: ["Routine", "Optional", "Booster", "Travel"],
      default: "Routine",
    },
    dateAdministered: {
      type: Date,
      required: true,
    },
    nextDoseDate: Date,
    status: {
      type: String,
      enum: ["scheduled", "completed", "missed", "overdue"],
      default: "scheduled",
    },
    clinic: {
      name: String,
      address: String,
      doctor: String,
    },
    batchNumber: String,
    sideEffects: [String],
    notes: String,
    administeredBy: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
vaccinationSchema.index({ childId: 1, dateAdministered: -1 });
vaccinationSchema.index({ status: 1, nextDoseDate: 1 });

// Virtual for upcoming vaccines
vaccinationSchema.virtual("isUpcoming").get(function () {
  if (!this.nextDoseDate) return false;
  const today = new Date();
  const nextDose = new Date(this.nextDoseDate);
  return nextDose > today && this.status === "scheduled";
});

export default mongoose.model("Vaccination", vaccinationSchema);