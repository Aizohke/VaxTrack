export const vaccineSchedule = [
  {
    age: 0,
    vaccines: [
      {
        name: 'BCG',
        description: 'Bacillus Calmette-Guérin vaccine for tuberculosis',
        doses: 1,
        notes: 'Given at birth or first contact'
      },
      {
        name: 'Hepatitis B',
        description: 'Hepatitis B vaccine',
        doses: 1,
        notes: 'First dose at birth, then at 6, 10, and 14 weeks'
      }
    ]
  },
  {
    age: 6, // weeks
    vaccines: [
      {
        name: 'DTaP',
        description: 'Diphtheria, Tetanus, and Pertussis vaccine',
        doses: 1,
        notes: 'First of three primary doses'
      },
      {
        name: 'IPV',
        description: 'Inactivated Polio Vaccine',
        doses: 1,
        notes: 'First of three primary doses'
      },
      {
        name: 'Hib',
        description: 'Haemophilus influenzae type b vaccine',
        doses: 1,
        notes: 'First of three primary doses'
      },
      {
        name: 'PCV',
        description: 'Pneumococcal Conjugate Vaccine',
        doses: 1,
        notes: 'First of three primary doses'
      },
      {
        name: 'Rotavirus',
        description: 'Rotavirus vaccine',
        doses: 1,
        notes: 'First of three doses (oral)'
      }
    ]
  },
  {
    age: 10, // weeks
    vaccines: [
      {
        name: 'DTaP',
        description: 'Diphtheria, Tetanus, and Pertussis vaccine',
        doses: 2,
        notes: 'Second primary dose'
      },
      {
        name: 'IPV',
        description: 'Inactivated Polio Vaccine',
        doses: 2,
        notes: 'Second primary dose'
      },
      {
        name: 'Hib',
        description: 'Haemophilus influenzae type b vaccine',
        doses: 2,
        notes: 'Second primary dose'
      },
      {
        name: 'PCV',
        description: 'Pneumococcal Conjugate Vaccine',
        doses: 2,
        notes: 'Second primary dose'
      },
      {
        name: 'Rotavirus',
        description: 'Rotavirus vaccine',
        doses: 2,
        notes: 'Second dose (oral)'
      }
    ]
  },
  {
    age: 14, // weeks
    vaccines: [
      {
        name: 'DTaP',
        description: 'Diphtheria, Tetanus, and Pertussis vaccine',
        doses: 3,
        notes: 'Third primary dose'
      },
      {
        name: 'IPV',
        description: 'Inactivated Polio Vaccine',
        doses: 3,
        notes: 'Third primary dose'
      },
      {
        name: 'Hib',
        description: 'Haemophilus influenzae type b vaccine',
        doses: 3,
        notes: 'Third primary dose'
      },
      {
        name: 'PCV',
        description: 'Pneumococcal Conjugate Vaccine',
        doses: 3,
        notes: 'Third primary dose'
      },
      {
        name: 'Rotavirus',
        description: 'Rotavirus vaccine',
        doses: 3,
        notes: 'Third dose (oral) - final dose for some brands'
      }
    ]
  },
  {
    age: 9, // months
    vaccines: [
      {
        name: 'Measles',
        description: 'Measles vaccine',
        doses: 1,
        notes: 'First dose of measles vaccine'
      },
      {
        name: 'Yellow Fever',
        description: 'Yellow fever vaccine',
        doses: 1,
        notes: 'In endemic areas'
      }
    ]
  },
  {
    age: 18, // months
    vaccines: [
      {
        name: 'DTaP',
        description: 'Diphtheria, Tetanus, and Pertussis vaccine',
        doses: 4,
        notes: 'First booster dose'
      },
      {
        name: 'IPV',
        description: 'Inactivated Polio Vaccine',
        doses: 4,
        notes: 'Booster dose'
      },
      {
        name: 'Measles',
        description: 'Measles vaccine',
        doses: 2,
        notes: 'Second dose of measles vaccine (MMR)'
      }
    ]
  }
];

// Helper function to get vaccines by age in months
export const getVaccinesByAge = (ageInMonths) => {
  return vaccineSchedule
    .filter(schedule => schedule.age <= ageInMonths)
    .flatMap(schedule => schedule.vaccines);
};

// Get recommended vaccines for a child's age
export const getRecommendedVaccines = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                     (today.getMonth() - birthDate.getMonth());
  
  return getVaccinesByAge(ageInMonths);
};
