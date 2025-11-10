import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Syringe,
  CheckCircle,
  MapPin,
  Calendar,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    childrenCount: 0,
    upcomingVaccines: 0,
    completedVaccines: 0,
    nearbyClinics: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingVaccines, setUpcomingVaccines] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      childrenCount: 2,
      upcomingVaccines: 3,
      completedVaccines: 12,
      nearbyClinics: 5,
    });

    setRecentActivity([
      {
        id: 1,
        action: "Vaccine recorded",
        child: "Amina Mwangi",
        vaccine: "Measles",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Appointment booked",
        clinic: "Nairobi Hospital",
        time: "1 day ago",
      },
      {
        id: 3,
        action: "Child added",
        child: "James Otieno",
        time: "2 days ago",
      },
    ]);

    setUpcomingVaccines([
      {
        id: 1,
        child: "Amina Mwangi",
        vaccine: "Polio",
        date: "2024-02-15",
        daysLeft: 3,
      },
      {
        id: 2,
        child: "James Otieno",
        vaccine: "DPT",
        date: "2024-02-20",
        daysLeft: 8,
      },
    ]);
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your vaccination overview.
          </p>
        </div>
        <Link
          to="/app/children"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Child
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Children"
          value={stats.childrenCount}
          color="bg-blue-500"
        />
        <StatCard
          icon={Calendar}
          label="Upcoming Vaccines"
          value={stats.upcomingVaccines}
          color="bg-orange-500"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={stats.completedVaccines}
          color="bg-green-500"
        />
        <StatCard
          icon={MapPin}
          label="Nearby Clinics"
          value={stats.nearbyClinics}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Vaccines */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Vaccines
            </h2>
            <Link
              to="/app/tracker"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingVaccines.map((vaccine) => (
              <div
                key={vaccine.id}
                className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{vaccine.vaccine}</p>
                  <p className="text-sm text-gray-600">{vaccine.child}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(vaccine.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-orange-600">
                    {vaccine.daysLeft} days left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span>
                    {activity.child && ` for ${activity.child}`}
                    {activity.vaccine && ` - ${activity.vaccine}`}
                    {activity.clinic && ` at ${activity.clinic}`}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/app/children"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Child</span>
          </Link>
          <Link
            to="/app/tracker"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Syringe className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Record Vaccine
            </span>
          </Link>
          <Link
            to="/app/clinics"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <MapPin className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              Find Clinics
            </span>
          </Link>
          <Link
            to="/app/ai-assistant"
            className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Activity className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">
              AI Assistant
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;