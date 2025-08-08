import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Globe, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Use environment variable for API key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  sources?: string[];
}

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
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced search function that searches multiple sources
  const searchMultipleSources = async (query: string): Promise<{ content: string; sources: string[] }> => {
    const sources: string[] = [];
    let searchResults = '';

    try {
      // Try to fetch from GitHub API
      try {
        const githubResponse = await fetch('https://api.github.com/users/udityamerit');
        if (githubResponse.ok) {
          const githubData = await githubResponse.json();
          searchResults += `GitHub Profile: ${githubData.bio || 'AI/ML enthusiast'}, ${githubData.public_repos} public repositories, ${githubData.followers} followers. `;
          sources.push('GitHub API');
        }
      } catch (error) {
        console.log('GitHub API not accessible');
      }

      // Try to fetch repository information
      try {
        const reposResponse = await fetch('https://api.github.com/users/udityamerit/repos?sort=updated&per_page=10');
        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          const repoNames = repos.slice(0, 5).map((repo: any) => repo.name).join(', ');
          searchResults += `Recent GitHub projects: ${repoNames}. `;
          sources.push('GitHub Repositories');
        }
      } catch (error) {
        console.log('GitHub repos API not accessible');
      }

      // Add portfolio information
      searchResults += `Portfolio: Computer Science Engineering student at VIT Bhopal specializing in AI/ML. Expert in Python, Machine Learning, Deep Learning. 350+ LeetCode problems solved. Winner of InnovMinds Expo Hackathon. `;
      sources.push('Portfolio Data');

      return { content: searchResults, sources };
    } catch (error) {
      console.error('Search error:', error);
      return { 
        content: 'Unable to fetch real-time data. Please check your internet connection.', 
        sources: ['Error'] 
      };
    }
  };

  const callGeminiWithWebSearch = async (userMessage: string): Promise<{ response: string; sources: string[] }> => {
    try {
      setIsTyping(true);

      // Check if API key is available
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured');
      }

      // First, search for relevant information
      const searchData = await searchMultipleSources(userMessage);

      // Create a comprehensive prompt for Gemini
      const prompt = `You are Uditya Narayan Tiwari's professional AI assistant. Based on the following real-time information and the user's question, provide a comprehensive, professional response.

REAL-TIME SEARCH RESULTS:
${searchData.content}

UDITYA'S CORE INFORMATION:
- Name: Uditya Narayan Tiwari
- Education: B.Tech Computer Science Engineering (AI & ML) at VIT Bhopal (2023-2027)
- Location: Bhopal, Madhya Pradesh, India
- Email: tiwarimerit@gmail.com
- GitHub: https://github.com/udityamerit
- LinkedIn: https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/
- LeetCode: https://leetcode.com/u/Uditya_Narayan_Tiwari/

TECHNICAL EXPERTISE:
- Programming: Python (Expert), C++, Java
- AI/ML: Machine Learning, Deep Learning, TensorFlow, PyTorch, scikit-learn
- Data Science: Pandas, NumPy, Matplotlib, Jupyter
- Web Development: Streamlit, Flask
- Competitive Programming: 350+ LeetCode problems solved

MAJOR ACHIEVEMENTS:
- Winner: InnovMinds Expo Hackathon (VIT Bhopal)
- 5-star ratings in Python & C++ (HackerRank)
- Core member of Microsoft Technical Club, Matrix Tech Club, Blockchain R&D Club
- Multiple AI/ML projects including customer churn prediction, breast cancer detection

USER QUESTION: ${userMessage}

Please provide a detailed, professional response using the real-time information above. If the question is about Uditya specifically, use the provided information. If it's a general question, answer professionally while maintaining context as Uditya's AI assistant.

RESPONSE GUIDELINES:
- Be comprehensive and informative
- Use professional language
- Include specific examples and achievements when relevant
- Provide actionable information
- Maintain an engaging and helpful tone
- If real-time data is limited, use the core information provided`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API_KEY_INVALID');
        } else if (response.status === 403) {
          throw new Error('API_KEY_FORBIDDEN');
        } else {
          throw new Error(`Gemini API error: ${response.status}`);
        }
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return {
          response: data.candidates[0].content.parts[0].text,
          sources: searchData.sources
        };
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message === 'API_KEY_INVALID' || error.message === 'Gemini API key not configured') {
          return {
            response: `⚠️ **AI Assistant Configuration Required**

I'm currently unable to provide AI-powered responses because the Gemini API key needs to be configured. 

However, I can still share comprehensive information about Uditya Narayan Tiwari:

**🎓 Education & Background:**
- B.Tech Computer Science Engineering (AI & ML) at VIT Bhopal (2023-2027)
- Location: Bhopal, Madhya Pradesh, India

**💻 Technical Expertise:**
- **Programming Languages:** Python (Expert), C++, Java
- **AI/ML Technologies:** Machine Learning, Deep Learning, TensorFlow, PyTorch, scikit-learn
- **Data Science:** Pandas, NumPy, Matplotlib, Jupyter Notebooks
- **Web Development:** Streamlit, Flask
- **Competitive Programming:** 350+ LeetCode problems solved

**🏆 Major Achievements:**
- Winner of InnovMinds Expo Hackathon at VIT Bhopal
- 5-star ratings in Python & C++ on HackerRank
- Core member of Microsoft Technical Club, Matrix Tech Club, and Blockchain R&D Club
- Developed multiple AI/ML projects including customer churn prediction and breast cancer detection systems

**📞 Contact Information:**
- Email: tiwarimerit@gmail.com
- GitHub: https://github.com/udityamerit
- LinkedIn: https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/
- LeetCode: https://leetcode.com/u/Uditya_Narayan_Tiwari/

Feel free to ask specific questions about Uditya's projects, skills, or achievements!`,
            sources: ['Static Portfolio Data']
          };
        } else if (error.message === 'API_KEY_FORBIDDEN') {
          return {
            response: `⚠️ **API Access Issue**

The AI assistant is currently experiencing access limitations. However, I can provide detailed information about Uditya Narayan Tiwari based on his portfolio data.

What specific information would you like to know about Uditya's:
- Technical projects and achievements
- Educational background and skills
- Professional experience and certifications
- Contact information and social profiles

Please ask, and I'll provide comprehensive details!`,
            sources: ['Static Portfolio Data']
          };
        }
      }

      return {
        response: `I apologize for the technical difficulty. Let me provide you with comprehensive information about Uditya Narayan Tiwari:

**🎓 About Uditya:**
Uditya is a Computer Science Engineering student at VIT Bhopal (2023-2027) specializing in AI & Machine Learning. He's passionate about solving complex problems through technology and has demonstrated exceptional skills in competitive programming and AI/ML development.

**💻 Technical Skills:**
- **Programming:** Python (Expert level), C++, Java
- **AI/ML:** TensorFlow, PyTorch, scikit-learn, Deep Learning
- **Data Science:** Pandas, NumPy, Matplotlib, Jupyter
- **Web Development:** Streamlit, Flask
- **Problem Solving:** 350+ LeetCode problems solved

**🏆 Key Achievements:**
- Winner of InnovMinds Expo Hackathon at VIT Bhopal
- 5-star ratings in Python & C++ on HackerRank
- Active member of multiple technical clubs
- Developed several AI/ML projects

**📞 Connect with Uditya:**
- Email: tiwarimerit@gmail.com
- GitHub: https://github.com/udityamerit
- LinkedIn: https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/

Is there something specific you'd like to know about Uditya's projects or expertise?`,
        sources: ['Portfolio Data']
      };
    }
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

    try {
      const { response, sources } = await callGeminiWithWebSearch(inputMessage);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date(),
        sources: sources
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize for the technical difficulty. Please try asking your question again, or contact Uditya directly at tiwarimerit@gmail.com for immediate assistance.",
        isBot: true,
        timestamp: new Date(),
        sources: ['Error']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            className="fixed bottom-20 sm:bottom-28 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-[70vh] sm:h-[500px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-5 rounded-t-lg">
              <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <Globe size={20} className="sm:w-6 sm:h-6" />
                Uditya's AI Assistant
              </h3>
              <p className="text-xs sm:text-sm opacity-90">
                {GEMINI_API_KEY ? 'AI-powered responses • Portfolio information' : 'Portfolio information • Contact details'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg ${
                    msg.isBot 
                      ? 'bg-slate-100 dark:bg-slate-700 text-black dark:text-white border border-slate-200 dark:border-slate-600' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  }`}>
                    <p className="text-xs sm:text-sm whitespace-pre-line break-words leading-relaxed">{msg.text}</p>
                    
                    {/* Show sources for bot messages */}
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
                    
                    <div className={`text-xs mt-1 ${msg.isBot ? 'text-slate-500 dark:text-slate-400' : 'text-blue-100'}`}>
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {GEMINI_API_KEY ? 'Processing your question...' : 'Searching portfolio data...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 sm:p-4 border-t border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex gap-2">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Uditya's projects, skills, achievements..."
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
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-1">
                <Globe size={12} />
                {GEMINI_API_KEY ? 'AI-powered responses with portfolio data' : 'Portfolio information and contact details'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;