
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const VaccinationTracker = () => {
  const [children, setChildren] = useState([]);
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [formData, setFormData] = useState({
    vaccineName: "",
    vaccineDate: "",
    status: "scheduled",
    notes: "",
    nextDoseDate: "",
  });

  useEffect(() => {
    // Mock data - replace with API calls
    setChildren([
      { id: 1, name: "Amina Mwangi" },
      { id: 2, name: "James Otieno" },
    ]);

    setVaccinationRecords([
      {
        id: 1,
        childId: 1,
        childName: "Amina Mwangi",
        vaccineName: "BCG",
        date: "2023-01-15",
        status: "completed",
        notes: "Given at birth",
      },
      {
        id: 2,
        childId: 1,
        childName: "Amina Mwangi",
        vaccineName: "Polio",
        date: "2023-02-20",
        status: "completed",
        notes: "First dose",
      },
      {
        id: 3,
        childId: 2,
        childName: "James Otieno",
        vaccineName: "Measles",
        date: "2024-03-15",
        status: "scheduled",
        notes: "Upcoming vaccination",
      },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedChild) {
      alert("Please select a child");
      return;
    }

    const child = children.find((c) => c.id === parseInt(selectedChild));
    const newRecord = {
      id: Date.now(),
      childId: parseInt(selectedChild),
      childName: child.name,
      ...formData,
    };

    setVaccinationRecords([...vaccinationRecords, newRecord]);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setSelectedChild("");
    setFormData({
      vaccineName: "",
      vaccineDate: "",
      status: "scheduled",
      notes: "",
      nextDoseDate: "",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "scheduled":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "missed":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: vaccinationRecords.length,
    completed: vaccinationRecords.filter((r) => r.status === "completed")
      .length,
    scheduled: vaccinationRecords.filter((r) => r.status === "scheduled")
      .length,
    missed: vaccinationRecords.filter((r) => r.status === "missed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vaccination Tracker
          </h1>
          <p className="text-gray-600">
            Track and manage all vaccination records
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Record Vaccine</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.completed}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.scheduled}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Missed</p>
              <p className="text-2xl font-bold text-red-600">{stats.missed}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Vaccination Records */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Vaccination Records
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {vaccinationRecords.map((record) => (
            <div
              key={record.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(record.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {record.vaccineName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {record.childName} •{" "}
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    {record.notes && (
                      <p className="text-sm text-gray-500 mt-1">
                        {record.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Record Vaccination</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Child
                </label>
                <select
                  required
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a child</option>
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccine Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.vaccineName}
                  onChange={(e) =>
                    setFormData({ ...formData, vaccineName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., BCG, Polio, Measles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccination Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.vaccineDate}
                  onChange={(e) =>
                    setFormData({ ...formData, vaccineDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Dose Date (if applicable)
                </label>
                <input
                  type="date"
                  value={formData.nextDoseDate}
                  onChange={(e) =>
                    setFormData({ ...formData, nextDoseDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Record
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccinationTracker;