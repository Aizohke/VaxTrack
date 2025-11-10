import express from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentStats
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/stats')
  .get(getAppointmentStats);

router.route('/:id')
  .put(updateAppointment)
  .delete(deleteAppointment);

export default router;