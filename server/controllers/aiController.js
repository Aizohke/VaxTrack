import { getAIResponse } from "../utils/aiService.js";

// Handle AI chat messages
export const handleAIChat = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await getAIResponse(message, conversationHistory);

    res.status(200).json({
      success: true,
      response: {
        text: response,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({
      success: false,
      error: "Unable to process AI request",
      fallback:
        "I'm sorry, I'm having trouble responding right now. Please try again later or consult with your healthcare provider for immediate assistance.",
    });
  }
};

// Get vaccine recommendations based on child's age
export const getVaccineRecommendations = async (req, res) => {
  try {
    const { childAgeInMonths } = req.body;

    if (childAgeInMonths === undefined) {
      return res.status(400).json({
        success: false,
        message: "Child age in months is required",
      });
    }

    // Simple rule-based recommendations
    const recommendations = getVaccineScheduleByAge(childAgeInMonths);

    res.status(200).json({
      success: true,
      recommendations,
      childAgeInMonths,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Helper function for vaccine recommendations
function getVaccineScheduleByAge(ageInMonths) {
  const schedule = [
    { age: 0, vaccines: ["BCG", "Hepatitis B"] },
    { age: 6, vaccines: ["DTaP", "Polio", "Hib", "PCV", "Rotavirus"] },
    { age: 10, vaccines: ["DTaP", "Polio", "Hib", "PCV", "Rotavirus"] },
    { age: 14, vaccines: ["DTaP", "Polio", "Hib", "PCV", "Rotavirus"] },
    { age: 9, vaccines: ["Measles", "Yellow Fever"] },
    { age: 18, vaccines: ["DTaP", "Measles", "Polio"] },
  ];

  return (
    schedule
      .filter((item) => item.age <= ageInMonths)
      .sort((a, b) => b.age - a.age)[0]?.vaccines || []
  );
}