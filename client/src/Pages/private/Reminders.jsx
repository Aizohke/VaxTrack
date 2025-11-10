
import React, { useState, useEffect } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
  Calendar,
  Clock,
} from "lucide-react";

const Reminders = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    reminderDays: 3,
  });
  const [upcomingReminders, setUpcomingReminders] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    setUpcomingReminders([
      {
        id: 1,
        childName: "Amina Mwangi",
        vaccine: "Polio Booster",
        dueDate: "2024-02-15",
        type: "vaccine",
        priority: "high",
      },
      {
        id: 2,
        childName: "James Otieno",
        vaccine: "Measles",
        dueDate: "2024-02-20",
        type: "vaccine",
        priority: "medium",
      },
      {
        id: 3,
        childName: "Amina Mwangi",
        vaccine: "Annual Checkup",
        dueDate: "2024-03-01",
        type: "checkup",
        priority: "low",
      },
    ]);
  }, []);

  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Reminders & Notifications
        </h1>
        <p className="text-gray-600">
          Manage your notification preferences and view upcoming reminders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Settings
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive reminders via email
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingsChange(
                    "emailNotifications",
                    !settings.emailNotifications
                  )
                }
                className="relative"
              >
                {settings.emailNotifications ? (
                  <ToggleRight className="w-12 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-12 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive reminders via SMS
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingsChange(
                    "smsNotifications",
                    !settings.smsNotifications
                  )
                }
                className="relative"
              >
                {settings.smsNotifications ? (
                  <ToggleRight className="w-12 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-12 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive app notifications
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  handleSettingsChange(
                    "pushNotifications",
                    !settings.pushNotifications
                  )
                }
                className="relative"
              >
                {settings.pushNotifications ? (
                  <ToggleRight className="w-12 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-12 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remind me (days before)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={settings.reminderDays}
                  onChange={(e) =>
                    handleSettingsChange(
                      "reminderDays",
                      parseInt(e.target.value)
                    )
                  }
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-900 w-8">
                  {settings.reminderDays}
                </span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Settings
            </button>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Reminders
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {upcomingReminders.map((reminder) => {
              const daysUntilDue = getDaysUntilDue(reminder.dueDate);
              return (
                <div
                  key={reminder.id}
                  className={`p-4 border rounded-lg ${getPriorityColor(
                    reminder.priority
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{reminder.vaccine}</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white">
                      {reminder.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{reminder.childName}</span>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>
                          {new Date(reminder.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`font-semibold ${
                        daysUntilDue <= 3
                          ? "text-red-600"
                          : daysUntilDue <= 7
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {daysUntilDue === 0
                        ? "Today"
                        : daysUntilDue === 1
                        ? "Tomorrow"
                        : `In ${daysUntilDue} days`}
                    </span>
                  </div>
                </div>
              );
            })}

            {upcomingReminders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No upcoming reminders</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Notifications
        </h2>
        <div className="space-y-3">
          {[
            {
              id: 1,
              message: "Polio booster reminder for Amina Mwangi",
              time: "2 hours ago",
              read: false,
            },
            {
              id: 2,
              message: "Appointment confirmed at Nairobi Hospital",
              time: "1 day ago",
              read: true,
            },
            {
              id: 3,
              message: "Monthly health tips newsletter",
              time: "2 days ago",
              read: true,
            },
          ].map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                notification.read
                  ? "bg-gray-50"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
                <span
                  className={
                    notification.read
                      ? "text-gray-600"
                      : "text-gray-900 font-medium"
                  }
                >
                  {notification.message}
                </span>
              </div>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminders;