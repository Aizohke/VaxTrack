// Calculate age from date of birth
export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Format date to localized string
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate a random color for avatars
export const getRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Calculate due date for next vaccine dose
export const calculateNextDoseDate = (lastDoseDate, weeksUntilNextDose) => {
  const nextDose = new Date(lastDoseDate);
  nextDose.setDate(nextDose.getDate() + (weeksUntilNextDose * 7));
  return nextDose;
};

// Check if a vaccine is overdue
export const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date();
};

// Generate a unique conversation ID for two users
export const generateConversationId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random ID
export const generateId = (length = 8) => {
  return Math.random().toString(36).substr(2, length);
};