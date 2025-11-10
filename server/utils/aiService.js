import axios from "axios";

// Simple rule-based AI responses for vaccine questions
const vaccineKnowledgeBase = {
  "side effects": `Common side effects of vaccines are usually mild and temporary:
• Low-grade fever
• Soreness, redness, or swelling at injection site
• Fussiness or mild irritability
• Fatigue or drowsiness
• Loss of appetite

These typically resolve within 24-48 hours. Serious side effects are very rare. Contact your doctor if your child develops a high fever, severe rash, or unusual behavior.`,

  "6 month": `For a 6-month-old baby, the typical vaccines include:
• DTaP (Diphtheria, Tetanus, Pertussis) - 3rd dose
• Hib (Haemophilus influenzae type b) - 3rd dose
• IPV (Polio) - 3rd dose
• PCV13 (Pneumococcal) - 3rd dose
• Rotavirus - 3rd dose
• Hepatitis B - 3rd dose (if not completed earlier)

Some clinics may also offer the annual flu vaccine. Always consult with your pediatrician for the exact schedule.`,

  prepare: `To prepare your child for vaccination:
• Stay calm and positive - children sense anxiety
• Bring their favorite toy or blanket for comfort
• Dress them in loose, comfortable clothing
• Feed them before the appointment
• Use distraction techniques during the shot
• Hold and comfort them during the process
• Plan a fun activity afterward as a reward

For older children, explain that the shot helps keep them healthy.`,

  missed: `If you've missed a vaccine dose:
• Don't worry - catch-up schedules are available
• Contact your healthcare provider as soon as possible
• You don't need to restart the vaccine series
• The missed dose can usually be given at your next visit
• Maintain your child's vaccination record updated
• Set reminders for future appointments

It's important to get back on schedule to ensure full protection.`,

  fever: `If your child develops a fever after vaccination:
• This is a common immune response
• Use age-appropriate fever reducers as directed
• Keep your child hydrated with plenty of fluids
• Dress them in light clothing
• Use cool compresses if needed
• Monitor their temperature regularly

Contact your doctor if:
• Fever is above 38.5°C (101.3°F)
• Fever lasts more than 48 hours
• Your child seems very uncomfortable or lethargic`,

  schedule: `The standard childhood vaccination schedule typically includes:
Birth: BCG, Hepatitis B
6 weeks: DTaP, Polio, Hib, PCV, Rotavirus
10 weeks: DTaP, Polio, Hib, PCV, Rotavirus
14 weeks: DTaP, Polio, Hib, PCV, Rotavirus
9 months: Measles, Yellow Fever
18 months: DTaP, Measles, Polio

This may vary based on your country's guidelines and your child's specific health needs.`,
};

export const getAIResponse = async (message, conversationHistory = []) => {
  const lowerMessage = message.toLowerCase();

  // Check for specific keywords in the message
  for (const [keyword, response] of Object.entries(vaccineKnowledgeBase)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  // Enhanced responses for common questions
  if (lowerMessage.includes("allergic") || lowerMessage.includes("reaction")) {
    return `Serious allergic reactions to vaccines are very rare (about 1 in a million doses). Signs of a severe allergic reaction include:
• Difficulty breathing
• Swelling of the face and throat
• Fast heartbeat
• Dizziness and weakness

If you notice any of these signs, seek immediate medical attention. Mild reactions like rash or hives are more common and usually resolve on their own.`;
  }

  if (
    lowerMessage.includes("multiple") ||
    lowerMessage.includes("many vaccines")
  ) {
    return `Giving multiple vaccines at once is safe and recommended because:
• It reduces the number of clinic visits
• It ensures timely protection
• Children's immune systems can handle many antigens
• Combination vaccines have been thoroughly tested
• It follows established medical guidelines

The recommended schedule is designed to provide protection when children are most vulnerable to diseases.`;
  }

  if (lowerMessage.includes("autism") || lowerMessage.includes("mmr")) {
    return `Extensive scientific research has shown no link between vaccines and autism. The original study suggesting a connection has been thoroughly discredited and retracted. Major health organizations worldwide, including WHO and CDC, confirm that vaccines are safe and do not cause autism.

Vaccines protect children from serious, sometimes fatal diseases while providing important public health benefits through herd immunity.`;
  }

  // Default response for unrecognized questions
  return `I understand you're asking about vaccines and child health. For specific medical advice regarding your child's vaccination schedule or health concerns, I recommend consulting with your pediatrician or healthcare provider. They can provide personalized guidance based on your child's medical history and current health status.

Is there anything else I can help you with regarding general vaccine information, side effects, or scheduling?`;
};