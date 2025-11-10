import Reminder from '../models/Reminder.js';
import Child from '../models/Child.js';

// Get all reminders for a user
export const getReminders = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    
    let query = { userId: req.user._id };
    
    if (status) query.status = status;
    if (type) query.type = type;
    
    const reminders = await Reminder.find(query)
      .populate('childId', 'name dateOfBirth')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Reminder.countDocuments(query);
    
    res.status(200).json({
      success: true,
      reminders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get upcoming reminders
export const getUpcomingReminders = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(days));
    
    const reminders = await Reminder.find({
      userId: req.user._id,
      dueDate: {
        $gte: startDate,
        $lte: endDate
      },
      status: 'pending'
    })
      .populate('childId', 'name dateOfBirth')
      .sort({ dueDate: 1 });
    
    res.status(200).json({ success: true, reminders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a reminder
export const createReminder = async (req, res) => {
  try {
    const { childId, type, title, description, dueDate, reminderDate, priority, notificationMethods } = req.body;
    
    // If childId is provided, verify it belongs to the user
    if (childId) {
      const child = await Child.findOne({ _id: childId, parentId: req.user._id });
      if (!child) {
        return res.status(404).json({ success: false, message: 'Child not found' });
      }
    }
    
    const reminder = new Reminder({
      userId: req.user._id,
      childId,
      type,
      title,
      description,
      dueDate,
      reminderDate,
      priority,
      notificationMethods,
      createdBy: req.user._id
    });
    
    await reminder.save();
    
    if (childId) {
      await reminder.populate('childId', 'name dateOfBirth');
    }
    
    res.status(201).json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a reminder
export const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('childId', 'name dateOfBirth');
    
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    
    res.status(200).json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!reminder) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }
    
    res.status(200).json({ success: true, message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};