import Appointment from '../models/Appointment.js';
import Child from '../models/Child.js';
import Clinic from '../models/Clinic.js';
import Reminder from '../models/Reminder.js';

// Get all appointments for a user
export const getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { parentId: req.user._id };
    
    if (status) query.status = status;
    
    const appointments = await Appointment.find(query)
      .populate('childId', 'name dateOfBirth gender')
      .populate('clinicId', 'name address contact')
      .sort({ appointmentDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Appointment.countDocuments(query);
    
    res.status(200).json({
      success: true,
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { childId, clinicId, vaccineName, appointmentDate, notes } = req.body;
    
    // Verify child belongs to user
    const child = await Child.findOne({ _id: childId, parentId: req.user._id });
    if (!child) {
      return res.status(404).json({ success: false, message: 'Child not found' });
    }
    
    // Verify clinic exists
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ success: false, message: 'Clinic not found' });
    }
    
    const appointment = new Appointment({
      parentId: req.user._id,
      childId,
      clinicId,
      vaccineName,
      appointmentDate,
      notes,
      createdBy: req.user._id
    });
    
    await appointment.save();
    
    // Create reminder for appointment
    const reminderDate = new Date(appointmentDate);
    reminderDate.setDate(reminderDate.getDate() - req.user.reminderDays);
    
    const reminder = new Reminder({
      userId: req.user._id,
      childId,
      type: 'appointment',
      title: `Appointment: ${vaccineName}`,
      description: `Vaccination appointment at ${clinic.name}`,
      dueDate: appointmentDate,
      reminderDate,
      priority: 'high',
      createdBy: req.user._id
    });
    
    await reminder.save();
    
    // Populate for response
    await appointment.populate('childId', 'name dateOfBirth gender');
    await appointment.populate('clinicId', 'name address contact');
    
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, parentId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
      .populate('childId', 'name dateOfBirth gender')
      .populate('clinicId', 'name address contact');
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      parentId: req.user._id
    });
    
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    
    // Also delete associated reminders
    await Reminder.deleteMany({
      userId: req.user._id,
      type: 'appointment',
      dueDate: appointment.appointmentDate
    });
    
    res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get appointment statistics
export const getAppointmentStats = async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      { $match: { parentId: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalAppointments = await Appointment.countDocuments({ parentId: req.user._id });
    const upcomingAppointments = await Appointment.countDocuments({
      parentId: req.user._id,
      status: { $in: ['scheduled', 'confirmed'] },
      appointmentDate: { $gte: new Date() }
    });
    
    res.status(200).json({
      success: true,
      stats: {
        total: totalAppointments,
        upcoming: upcomingAppointments,
        byStatus: stats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
