import { body, validationResult } from 'express-validator';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for creating a child
export const validateChild = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Child name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('dateOfBirth')
    .isDate()
    .withMessage('Valid date of birth is required'),
  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  handleValidationErrors
];

// Validation rules for creating a vaccination record
export const validateVaccination = [
  body('childId')
    .isMongoId()
    .withMessage('Valid child ID is required'),
  body('vaccineName')
    .trim()
    .notEmpty()
    .withMessage('Vaccine name is required'),
  body('dateAdministered')
    .isDate()
    .withMessage('Valid date is required'),
  handleValidationErrors
];

// Validation rules for creating an appointment
export const validateAppointment = [
  body('childId')
    .isMongoId()
    .withMessage('Valid child ID is required'),
  body('clinicId')
    .isMongoId()
    .withMessage('Valid clinic ID is required'),
  body('vaccineName')
    .trim()
    .notEmpty()
    .withMessage('Vaccine name is required'),
  body('appointmentDate')
    .isISO8601()
    .withMessage('Valid appointment date is required'),
  handleValidationErrors
];

// Validation rules for sending a message
export const validateMessage = [
  body('receiverId')
    .isMongoId()
    .withMessage('Valid receiver ID is required'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters'),
  handleValidationErrors
];
