export const sampleClinics = [
  {
    name: "Nairobi County Hospital",
    type: "Hospital",
    address: {
      street: "Kapenguria Rd",
      city: "Nairobi",
      state: "Nairobi County",
      zipCode: "00100",
      country: "Kenya",
    },
    coordinates: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
    contact: {
      phone: "+254 20 272 6300",
      email: "info@nairobi-hospital.org",
      website: "https://nairobi-hospital.org",
    },
    hours: {
      monday: { open: "08:00", close: "17:00" },
      tuesday: { open: "08:00", close: "17:00" },
      wednesday: { open: "08:00", close: "17:00" },
      thursday: { open: "08:00", close: "17:00" },
      friday: { open: "08:00", close: "17:00" },
      saturday: { open: "09:00", close: "13:00" },
      sunday: { open: "09:00", close: "12:00" },
    },
    services: [
      "Vaccinations",
      "Pediatrics",
      "Emergency",
      "Lab Services",
      "Maternal Health",
    ],
    doctors: [
      {
        name: "Dr. Sarah Johnson",
        specialization: "Pediatrics",
        available: true,
      },
      {
        name: "Dr. Michael Chen",
        specialization: "Vaccination Specialist",
        available: true,
      },
    ],
    fees: {
      consultation: 1500,
      vaccination: 800,
    },
    rating: {
      average: 4.5,
      count: 234,
    },
  },
  {
    name: "Mji wa Huruma Clinic",
    type: "Clinic",
    address: {
      street: "Huruma Estate",
      city: "Nairobi",
      state: "Nairobi County",
      zipCode: "00100",
      country: "Kenya",
    },
    coordinates: {
      latitude: -1.27,
      longitude: 36.85,
    },
    contact: {
      phone: "+254 723 456 789",
      email: "hurumaclinic@health.go.ke",
    },
    hours: {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "09:00", close: "13:00" },
      sunday: { closed: true },
    },
    services: ["Vaccinations", "Maternal Health", "Child Wellness"],
    doctors: [
      {
        name: "Dr. Amina Mohamed",
        specialization: "General Practice",
        available: true,
      },
    ],
    fees: {
      consultation: 800,
      vaccination: 500,
    },
    rating: {
      average: 4.2,
      count: 156,
    },
  },
];
