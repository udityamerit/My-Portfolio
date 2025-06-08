import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🤖 Hello! I'm Uditya's AI assistant. I have comprehensive information about his skills, projects, achievements, and professional background from his portfolio, LinkedIn, and GitHub. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const comprehensiveResponses: { [key: string]: string } = {
    'about': `Uditya Narayan Tiwari
B.Tech CSE in AI/ML at VIT Bhopal (2023-2027)

AI/ML engineer with expertise in deep learning, blockchain technology, and Machine Learning model development. InnovMinds Expo Hackathon winner with 300+ LeetCode problems solved and leadership roles in multiple technical clubs.`,

    'skills': `Technical Expertise:
Programming: Python (Expert), C++ (Expert), Java, C
AI/ML: TensorFlow, PyTorch, Scikit-learn, OpenCV, NLP
Data Science: Pandas, NumPy, Matplotlib, Plotly, Streamlit
Tools: Git, GitHub, VsCode, Jupyter-Notebook`,

    'projects': `Key Projects:
End-to-End Deep Learning with ANN - Customer churn prediction with Streamlit deployment
Breast Cancer Prediction - Multi-model healthcare AI system with 95% accuracy
Weather Forecasting App - Real-time prediction with Flask and OpenWeatherMap API
LeetCode Solutions - 300+ optimized algorithm solutions repository

GitHub: github.com/udityamerit`,

    'experience': `Leadership & Experience:
Microsoft Technical Club (2025-Present) - Core Team Member

Blockchain R&D Club (2024-Present) - Core Team Member

Matrix Tech Club (2025-Present) - AI/ML Project Lead`,

    'achievements': `Recognition:
InnovMinds Expo Hackathon Winner - First Place at VIT Bhopal
300+ LeetCode Problems Solved with optimal solutions
Certified in Python for Data Science (Simplilearn)
Geodata Processing Certification (ISRO)
Machine Learning Basics Certification (Pantak)
International Health-Hack AI/ML Hackathon Participant`,

    'education': `Education:
Bachelor of Technology in Computer Science Engineering
Specialization: Artificial Intelligence & Machine Learning
Institution: Vellore Institute of Technology (VIT), Bhopal
Duration: 2023-2027 (Currently pursuing)

Focus Areas: Deep Learning, Computer Vision, NLP, Machine Learning, Healthcare AI`,

    'contact': `Contact Information:
Email: tiwarimerit@gmail.com
LinkedIn: linkedin.com/in/uditya-narayan-tiwari-562332289
GitHub: github.com/udityamerit
Portfolio: udityanarayantiwari.netlify.app
LeetCode: leetcode.com/u/Uditya_Narayan_Tiwari
Location: Bhopal, Madhya Pradesh, India

Available for: AI/ML projects, blockchain development, open-source contributions, technical mentorship`
};

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for specific topics with enhanced matching
    for (const [key, response] of Object.entries(comprehensiveResponses)) {
      if (message.includes(key) || 
          (key === 'projects' && (message.includes('project') || message.includes('work') || message.includes('portfolio') || message.includes('github') || message.includes('repository'))) ||
          (key === 'skills' && (message.includes('skill') || message.includes('technology') || message.includes('tech') || message.includes('programming') || message.includes('coding'))) ||
          (key === 'experience' && (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('role') || message.includes('position'))) ||
          (key === 'education' && (message.includes('education') || message.includes('study') || message.includes('university') || message.includes('college') || message.includes('degree'))) ||
          (key === 'achievements' && (message.includes('achievement') || message.includes('award') || message.includes('recognition') || message.includes('hackathon') || message.includes('certificate'))) ||
          (key === 'contact' && (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('connect'))) ||
          (key === 'machine learning' && (message.includes('ml') || message.includes('ai') || message.includes('artificial intelligence') || message.includes('deep learning'))) ||
          (key === 'blockchain' && (message.includes('crypto') || message.includes('smart contract') || message.includes('web3'))) ||
          (key === 'microsoft' && (message.includes('azure') || message.includes('.net') || message.includes('c#'))) ||
          (key === 'leetcode' && (message.includes('competitive') || message.includes('algorithm') || message.includes('coding challenge')))) {
        return response;
      }
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "🤖 Hello! I'm Uditya's AI assistant.";
    }

    // Thank you responses
    if (message.includes('thank')) {
      return "🤖 You're very welcome!";
    }

    // Help responses
    if (message.includes('help') || message.includes('what can you')) {
      return "🤖 I can provide comprehensive information about Uditya Narayan Tiwari.";
    }

    // Default response
    return "🤖 That's an interesting question! I specialize in providing information about Uditya's professional background.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Robot Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white p-5 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <div className="relative">
            {/* Robot Emoji */}
            <span className="text-3xl animate-pulse">🤖</span>
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
          </div>
        )}
      </motion.button>

      {/* Chat Window - Increased Size */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-28 right-6 z-40 w-96 h-[500px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-5 rounded-t-lg flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Uditya's AI Assistant</h3>
                <p className="text-sm text-white/80">Portfolio • LinkedIn • GitHub</p>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? 'bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900' : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      {message.isBot ? (
                        <span className="text-lg">🤖</span>
                      ) : (
                        <User size={16} className="text-slate-600 dark:text-slate-400" />
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${
                      message.isBot 
                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100' 
                        : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white'
                    }`}>
                      <p className="text-base whitespace-pre-line leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-lg animate-pulse">🤖</span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, projects, Microsoft experience..."
                  className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 text-base"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white p-3 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;