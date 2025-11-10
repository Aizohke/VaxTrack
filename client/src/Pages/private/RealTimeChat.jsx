import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Paperclip,
  Smile,
} from "lucide-react";

const RealTimeChat = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Pediatrician",
      avatar: "SJ",
      lastMessage:
        "The test results look good. When can you bring Amina for her next checkup?",
      timestamp: "2 hours ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Vaccination Specialist",
      avatar: "MC",
      lastMessage: "Remember the polio booster is due next week.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Nairobi Hospital Support",
      role: "Clinic Staff",
      avatar: "NH",
      lastMessage: "Your appointment has been confirmed.",
      timestamp: "3 days ago",
      unread: 0,
      online: true,
    },
  ]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeConversation) {
      // Load messages for active conversation
      setMessages([
        {
          id: 1,
          text: "Hello! How can I help you today?",
          sender: "doctor",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: 2,
          text: "Hi Dr. Sarah, I'm concerned about Amina's reaction to her last vaccine.",
          sender: "user",
          timestamp: new Date(Date.now() - 3500000),
        },
        {
          id: 3,
          text: "Can you describe what symptoms you're noticing?",
          sender: "doctor",
          timestamp: new Date(Date.now() - 3400000),
        },
        {
          id: 4,
          text: "She has a mild fever and some redness around the injection site.",
          sender: "user",
          timestamp: new Date(Date.now() - 3300000),
        },
        {
          id: 5,
          text: "Those are common side effects. Keep her hydrated and use a cool compress. The fever should subside within 24-48 hours.",
          sender: "doctor",
          timestamp: new Date(Date.now() - 3200000),
        },
      ]);
    }
  }, [activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate doctor response
    setTimeout(() => {
      const doctorMessage = {
        id: Date.now() + 1,
        text: "Thank you for the update. Monitor her temperature and let me know if it exceeds 38.5°C.",
        sender: "doctor",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, doctorMessage]);
    }, 2000);
  };

  const markAsRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                setActiveConversation(conversation);
                markAsRead(conversation.id);
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeConversation?.id === conversation.id
                  ? "bg-blue-50 border-blue-200"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {conversation.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {conversation.role}
                  </p>

                  <p className="text-sm text-gray-500 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>

                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-semibold">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {activeConversation.avatar}
                  </div>
                  {activeConversation.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {activeConversation.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {activeConversation.role} •{" "}
                    {activeConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.text}</div>
                    <div
                      className={`text-xs mt-1 ${
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
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Paperclip size={20} />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Smile size={20} />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Send className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start a Conversation
            </h3>
            <p className="text-gray-600 max-w-md">
              Select a conversation from the sidebar to start chatting with
              healthcare providers, or use the search to find specific doctors
              or clinic staff.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeChat;
