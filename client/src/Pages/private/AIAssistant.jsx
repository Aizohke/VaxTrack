import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your VaxTrack AI assistant. I can help answer questions about vaccines, schedules, side effects, and general child healthcare. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What vaccines are due for a 6-month-old?",
    "Common side effects of vaccines?",
    "How to prepare my child for vaccination?",
    "What to do if we miss a vaccine dose?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    if (
      lowerQuestion.includes("6 month") ||
      lowerQuestion.includes("6-month")
    ) {
      return "For a 6-month-old baby, the typical vaccines include:\n\n• DTaP (Diphtheria, Tetanus, Pertussis) - 3rd dose\n• Hib (Haemophilus influenzae type b) - 3rd dose\n• IPV (Polio) - 3rd dose\n• PCV13 (Pneumococcal) - 3rd dose\n• Rotavirus - 3rd dose\n• Hepatitis B - 3rd dose (if not completed earlier)\n\nSome clinics may also offer the annual flu vaccine. Always consult with your pediatrician for the exact schedule.";
    }

    if (lowerQuestion.includes("side effect")) {
      return "Common side effects of vaccines are usually mild and temporary:\n\n• Low-grade fever\n• Soreness, redness, or swelling at injection site\n• Fussiness or mild irritability\n• Fatigue or drowsiness\n• Loss of appetite\n\nThese typically resolve within 24-48 hours. Serious side effects are very rare. Contact your doctor if your child develops a high fever, severe rash, or unusual behavior.";
    }

    if (lowerQuestion.includes("prepare") || lowerQuestion.includes("ready")) {
      return "To prepare your child for vaccination:\n\n• Stay calm and positive - children sense anxiety\n• Bring their favorite toy or blanket for comfort\n• Dress them in loose, comfortable clothing\n• Feed them before the appointment\n• Use distraction techniques during the shot\n• Hold and comfort them during the process\n• Plan a fun activity afterward as a reward\n\nFor older children, explain that the shot helps keep them healthy.";
    }

    if (lowerQuestion.includes("miss") || lowerQuestion.includes("forgot")) {
      return "If you've missed a vaccine dose:\n\n• Don't worry - catch-up schedules are available\n• Contact your healthcare provider as soon as possible\n• You don't need to restart the vaccine series\n• The missed dose can usually be given at your next visit\n• Maintain your child's vaccination record updated\n• Set reminders for future appointments\n\nIt's important to get back on schedule to ensure full protection.";
    }

    return "I understand you're asking about vaccines and child health. For specific medical advice regarding your child's vaccination schedule or health concerns, I recommend consulting with your pediatrician or healthcare provider. They can provide personalized guidance based on your child's medical history and current health status. Is there anything else I can help you with regarding general vaccine information?";
  };

  const handleFeedback = (messageId, positive) => {
    // Handle feedback submission
    console.log(
      `Feedback for message ${messageId}: ${positive ? "positive" : "negative"}`
    );
    // In a real app, you would send this to your backend
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            AI Health Assistant
          </h1>
          <p className="text-sm text-gray-600">
            Get answers to your vaccine and health questions
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
          <Sparkles size={16} />
          <span>Powered by AI</span>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="bg-white border border-gray-300 text-sm text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-blue-600 ml-3"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 mr-3"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-blue-200"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {message.sender === "bot" && (
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleFeedback(message.id, true)}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-green-600 transition-colors"
                    >
                      <ThumbsUp size={14} />
                      <span>Helpful</span>
                    </button>
                    <button
                      onClick={() => handleFeedback(message.id, false)}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <ThumbsDown size={14} />
                      <span>Not helpful</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%]">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about vaccines, schedules, side effects..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send size={20} />
            <span>Send</span>
          </button>
        </form>

        <div className="mt-3 text-xs text-gray-500 text-center">
          AI responses are for informational purposes only. Always consult
          healthcare professionals for medical advice.
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;