import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["parent", "doctor", "admin"],
      default: "parent",
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    profileImage: String,
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
    },
    reminderDays: {
      type: Number,
      default: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);