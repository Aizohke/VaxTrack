import express from 'express';
import {
  getMessages,
  getConversations,
  sendMessage,
  markMessagesAsRead
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/conversations', getConversations);
router.get('/:userId', getMessages);
router.post('/', sendMessage);
router.put('/read', markMessagesAsRead);

export default router;
