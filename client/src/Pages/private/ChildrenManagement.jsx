import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

const ChildrenManagement = () => {
  const [children, setChildren] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    allergies: "",
    medicalHistory: "",
  });

  useEffect(() => {
    // Mock data - replace with API call
    setChildren([
      {
        id: 1,
        name: "Amina Mwangi",
        dob: "2022-05-15",
        gender: "Female",
        allergies: "None",
        medicalHistory: "No significant history",
      },
      {
        id: 2,
        name: "James Otieno",
        dob: "2023-01-20",
        gender: "Male",
        allergies: "Peanuts",
        medicalHistory: "Mild asthma",
      },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingChild) {
      // Update existing child
      setChildren(
        children.map((child) =>
          child.id === editingChild.id ? { ...child, ...formData } : child
        )
      );
    } else {
      // Add new child
      const newChild = {
        id: Date.now(),
        ...formData,
      };
      setChildren([...children, newChild]);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dob: "",
      gender: "",
      allergies: "",
      medicalHistory: "",
    });
    setEditingChild(null);
  };

  const handleEdit = (child) => {
    setFormData(child);
    setEditingChild(child);
    setIsModalOpen(true);
  };

  const handleDelete = (childId) => {
    if (window.confirm("Are you sure you want to delete this child?")) {
      setChildren(children.filter((child) => child.id !== childId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Children Management
          </h1>
          <p className="text-gray-600">
            Manage your children's profiles and information
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Child</span>
        </button>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {child.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(child)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(child.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Date of Birth:</span>
                <span className="font-medium">
                  {new Date(child.dob).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gender:</span>
                <span className="font-medium">{child.gender}</span>
              </div>
              <div className="flex justify-between">
                <span>Allergies:</span>
                <span className="font-medium">{child.allergies}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                <Eye size={16} />
                <span>View Vaccination Records</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingChild ? "Edit Child" : "Add New Child"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) =>
                    setFormData({ ...formData, allergies: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List any allergies..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical History
                </label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) =>
                    setFormData({ ...formData, medicalHistory: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any relevant medical history..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingChild ? "Update" : "Add"} Child
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

export default ChildrenManagement;