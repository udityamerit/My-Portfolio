// src/components/Chatbot.tsx

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Globe, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for messages and chat history
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  sources?: string[];
}

interface HistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// NLP UTILITY: Simple Intent Detection
const getIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  if (/\b(hello|hi|hey|greetings)\b/.test(lowerMessage)) return 'greeting';
  if (/\b(contact|email|reach out|connect)\b/.test(lowerMessage)) return 'contact';
  if (/\b(resume|cv)\b/.test(lowerMessage)) return 'resume_request';
  if (/\b(thank you|thanks|thx)\b/.test(lowerMessage)) return 'thanks';
  return 'general_query';
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🤖 Hello! I'm Uditya's intelligent AI assistant. I can provide information about Uditya's work, projects, achievements, and expertise. Ask me anything!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const searchMultipleSources = async (): Promise<{ content: string; sources: string[] }> => {
    const sources: string[] = [];
    let searchResults = '';
    try {
      const githubResponse = await fetch('https://api.github.com/users/udityamerit');
      if (githubResponse.ok) {
        const githubData = await githubResponse.json();
        searchResults += `GitHub Profile: ${githubData.bio || 'AI/ML enthusiast'}, ${githubData.public_repos} public repositories, ${githubData.followers} followers. `;
        sources.push('GitHub API');
      }
    } catch (error) { console.log('GitHub API not accessible'); }
    searchResults += `Portfolio: Computer Science Engineering student at VIT Bhopal specializing in AI/ML. Expert in Python, Machine Learning, Deep Learning. 350+ LeetCode problems solved. Winner of InnovMinds Expo Hackathon. `;
    sources.push('Portfolio Data');
    return { content: searchResults, sources };
  };

  // Securely calls YOUR backend server
  const callGeminiAPI = async (userMessage: string, chatHistory: HistoryItem[]): Promise<{ response: string; sources: string[] }> => {
    try {
      const basePrompt = `You are Uditya Narayan Tiwari's intelligent AI assistant. Provide concise, essential, and highly relevant responses. Your primary goal is to assist users efficiently.
      
      CORE PROFILE:
      - Name: Uditya Narayan Tiwari
      - Education: B.Tech CSE (AI & ML) at VIT Bhopal (2023-2027)
      - Email: tiwarimerit@gmail.com
      - GitHub: https://github.com/udityamerit
      - LinkedIn: https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/

      INSTRUCTIONS:
      - Be conversational and direct. Use the provided chat history to understand follow-up questions.
      - Keep responses under 150 words. Use bullet points for lists.`;
      
      const searchData = await searchMultipleSources();

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: chatHistory,
          userMessage: userMessage,
          prompt: `${basePrompt}\n\nLIVE DATA CONTEXT:\n${searchData.content}`
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned an error: ${response.status}`);
      }

      const data = await response.json();
      return {
        response: data.response,
        sources: searchData.sources,
      };
    } catch (error) {
      console.error('Error calling the backend server:', error);
      return {
        response: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        sources: ['Connection Error'],
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    const userMessage: Message = {
      id: Date.now(),
      text: userMessageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const intent = getIntent(userMessageText);
    let botResponseText: string;
    let sources: string[] = ['Pre-defined'];

    if (intent !== 'general_query') {
        if (intent === 'greeting') {
            botResponseText = "Hello there! How can I help you learn more about Uditya today?";
        } else if (intent === 'contact') {
            botResponseText = `You can connect with Uditya through the following channels:\n\n• **Email:** tiwarimerit@gmail.com\n• **LinkedIn:** [linkedin.com/in/uditya-narayan-tiwari-562332289/](https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/)`;
        } else if (intent === 'resume_request') {
            botResponseText = "Uditya's resume is available upon request. The best way to get the most up-to-date version is by sending a quick email to tiwarimerit@gmail.com!";
        } else { // thanks
            botResponseText = "You're welcome! Is there anything else I can help you with?";
        }
    } else {
        const apiResult = await callGeminiAPI(userMessageText, history);
        botResponseText = apiResult.response;
        sources = apiResult.sources;

        setHistory(prev => [
            ...prev,
            { role: 'user', parts: [{ text: userMessageText }] },
            { role: 'model', parts: [{ text: botResponseText }] },
        ]);
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      text: botResponseText,
      isBot: true,
      timestamp: new Date(),
      sources: sources,
    };

    setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
    }, 500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };

  // --- COMPLETE JSX (User Interface) ---
  // This part renders the button and the chat window.
  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={20} className="sm:w-7 sm:h-7" /> : <span className="text-xl sm:text-3xl">🤖</span>}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-20 sm:bottom-28 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md h-[70vh] sm:h-[500px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-5 rounded-t-lg flex-shrink-0">
              <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <Globe size={20} className="sm:w-6 sm:h-6" />
                Uditya's AI Assistant
              </h3>
              <p className="text-xs sm:text-sm opacity-90">
                AI-powered responses • Live data
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-slate-100 dark:bg-slate-700 text-black dark:text-white border border-slate-200 dark:border-slate-600'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  }`}>
                    <p className="text-xs sm:text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                    
                    {msg.isBot && msg.sources && msg.sources.length > 0 && !msg.sources.includes('Error') && (
                      <div className="mt-2 pt-2 border-t border-slate-300 dark:border-slate-600">
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Globe size={12} />
                          <span>Sources:</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {msg.sources.map((source, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                            >
                              {source.includes('GitHub') && <Github size={10} />}
                              {source.includes('LinkedIn') && <Linkedin size={10} />}
                              {source.includes('Portfolio') && <Globe size={10} />}
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className={`text-right text-xs mt-1 ${msg.isBot ? 'text-slate-500 dark:text-slate-400' : 'text-blue-100'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-2 sm:p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 px-2 sm:px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-black dark:text-white"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white p-2 sm:p-3 rounded-md disabled:opacity-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Send size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;