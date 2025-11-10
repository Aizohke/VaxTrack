import express from 'express';
import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  getUpcomingReminders
} from '../controllers/reminderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getReminders)
  .post(createReminder);

router.get('/upcoming', getUpcomingReminders);

router.route('/:id')
  .put(updateReminder)
  .delete(deleteReminder);

export default router;
