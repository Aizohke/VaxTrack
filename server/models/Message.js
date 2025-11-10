import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "document", "system"],
      default: "text",
    },
    attachments: [
      {
        filename: String,
        url: String,
        size: Number,
        mimetype: String,
      },
    ],
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    conversationId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient message retrieval
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1, receiverId: 1 });

// Pre-save middleware to generate conversationId
messageSchema.pre("save", function (next) {
  const participants = [
    this.senderId.toString(),
    this.receiverId.toString(),
  ].sort();
  this.conversationId = participants.join("_");
  next();
});

export default mongoose.model("Message", messageSchema);
