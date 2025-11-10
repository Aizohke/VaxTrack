import Message from "../models/Message.js";
import User from "../models/User.js";

export const setupSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user to their personal room
    socket.on("join_user", (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined room user_${userId}`);
    });

    // Join conversation
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });

    // Handle sending messages
    socket.on("send_message", async (data) => {
      try {
        const {
          senderId,
          receiverId,
          content,
          messageType = "text",
          attachments = [],
        } = data;

        // Save message to database
        const message = new Message({
          senderId,
          receiverId,
          content,
          messageType,
          attachments,
        });

        await message.save();

        // Populate sender info
        await message.populate("senderId", "firstName lastName profileImage");

        // Emit to both users
        io.to(`user_${receiverId}`).emit("receive_message", message);
        socket.emit("message_sent", message);

        console.log(`Message sent from ${senderId} to ${receiverId}`);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("message_error", { error: "Failed to send message" });
      }
    });

    // Handle typing indicators
    socket.on("typing_start", (data) => {
      socket.to(`user_${data.receiverId}`).emit("user_typing", {
        senderId: data.senderId,
        isTyping: true,
      });
    });

    socket.on("typing_stop", (data) => {
      socket.to(`user_${data.receiverId}`).emit("user_typing", {
        senderId: data.senderId,
        isTyping: false,
      });
    });

    // Handle message read receipts
    socket.on("mark_message_read", async (messageId) => {
      try {
        const message = await Message.findByIdAndUpdate(
          messageId,
          { read: true, readAt: new Date() },
          { new: true }
        );

        if (message) {
          io.to(`user_${message.senderId}`).emit("message_read", {
            messageId: message._id,
            readAt: message.readAt,
          });
        }
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};