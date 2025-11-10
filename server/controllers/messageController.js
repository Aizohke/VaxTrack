import Message from '../models/Message.js';
import User from '../models/User.js';

// Get conversations for a user
export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get unique conversations
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ['$receiverId', userId] },
                  { $eq: ['$read', false] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'lastMessage.senderId',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'lastMessage.receiverId',
          foreignField: '_id',
          as: 'receiver'
        }
      },
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          unreadCount: 1,
          participants: {
            $concatArrays: ['$sender', '$receiver']
          }
        }
      }
    ]);
    
    // Process conversations to get participant info
    const processedConversations = conversations.map(conv => {
      const otherParticipant = conv.participants.find(
        participant => participant._id.toString() !== userId.toString()
      );
      
      return {
        id: conv._id,
        lastMessage: conv.lastMessage,
        unreadCount: conv.unreadCount,
        participant: otherParticipant ? {
          _id: otherParticipant._id,
          firstName: otherParticipant.firstName,
          lastName: otherParticipant.lastName,
          role: otherParticipant.role,
          profileImage: otherParticipant.profileImage
        } : null
      };
    });
    
    res.status(200).json({ success: true, conversations: processedConversations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;
    
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId }
      ]
    })
      .populate('senderId', 'firstName lastName profileImage role')
      .populate('receiverId', 'firstName lastName profileImage role')
      .sort({ createdAt: 1 });
    
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, messageType = 'text', attachments = [] } = req.body;
    
    // Verify receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ success: false, message: 'Receiver not found' });
    }
    
    const message = new Message({
      senderId: req.user._id,
      receiverId,
      content,
      messageType,
      attachments
    });
    
    await message.save();
    await message.populate('senderId', 'firstName lastName profileImage role');
    
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { conversationId } = req.body;
    
    await Message.updateMany(
      {
        conversationId,
        receiverId: req.user._id,
        read: false
      },
      {
        read: true,
        readAt: new Date()
      }
    );
    
    res.status(200).json({ success: true, message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
