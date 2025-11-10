import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
    },
    type: {
      type: String,
      enum: ["vaccine", "appointment", "checkup", "medication"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: {
      type: Date,
      required: true,
    },
    reminderDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "cancelled", "snoozed"],
      default: "pending",
    },
    notificationMethods: {
      email: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    sentAt: Date,
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

// Indexes for efficient reminder queries
reminderSchema.index({ userId: 1, dueDate: 1 });
reminderSchema.index({ status: 1, reminderDate: 1 });
reminderSchema.index({ childId: 1 });

export default mongoose.model("Reminder", reminderSchema);