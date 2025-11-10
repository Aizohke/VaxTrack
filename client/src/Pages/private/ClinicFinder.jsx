import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Calendar, Star, Navigation } from "lucide-react";

const ClinicFinder = () => {
  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    parentName: "",
    childName: "",
    preferredDate: "",
    notes: "",
  });

  useEffect(() => {
    // Mock data - replace with API call
    setClinics([
      {
        id: 1,
        name: "Nairobi County Hospital",
        address: "Kapenguria Rd, Nairobi",
        phone: "+254 20 272 6300",
        hours: "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM",
        rating: 4.5,
        distance: "2.3 km",
        services: ["Vaccinations", "Pediatrics", "Emergency"],
        coordinates: { lat: -1.2921, lng: 36.8219 },
      },
      {
        id: 2,
        name: "Mji wa Huruma Clinic",
        address: "Huruma Estate, Nairobi",
        phone: "+254 723 456 789",
        hours: "Mon-Sat: 9:00 AM - 5:00 PM",
        rating: 4.2,
        distance: "3.1 km",
        services: ["Vaccinations", "Maternal Health"],
        coordinates: { lat: -1.27, lng: 36.85 },
      },
      {
        id: 3,
        name: "Westside Medical Centre",
        address: "Westlands, Nairobi",
        phone: "+254 20 445 6789",
        hours: "24/7 Emergency Services",
        rating: 4.7,
        distance: "5.2 km",
        services: ["Vaccinations", "Pediatrics", "Lab Services"],
        coordinates: { lat: -1.2659, lng: 36.8061 },
      },
    ]);
  }, []);

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (clinic) => {
    setSelectedClinic(clinic);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log("Booking submitted:", {
      clinic: selectedClinic,
      ...bookingData,
    });
    setIsBookingModalOpen(false);
    setBookingData({
      parentName: "",
      childName: "",
      preferredDate: "",
      notes: "",
    });
    alert("Appointment booked successfully!");
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clinic Finder</h1>
          <p className="text-gray-600">
            Find nearby clinics and book appointments
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Navigation size={20} />
          <span>Use My Location</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search clinics by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {clinic.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {renderStars(clinic.rating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({clinic.rating})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{clinic.address}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <span>{clinic.phone}</span>
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <Clock size={16} className="mr-2 mt-0.5" />
                  <span>{clinic.hours}</span>
                </div>

                <div className="flex items-center text-sm text-blue-600">
                  <Navigation size={16} className="mr-2" />
                  <span>{clinic.distance} away</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {clinic.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleBookAppointment(clinic)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedClinic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
            <p className="text-gray-600 mb-4">at {selectedClinic.name}</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.parentName}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      parentName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Name
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.childName}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      childName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.preferredDate}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      preferredDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any specific requirements or notes..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
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

export default ClinicFinder;