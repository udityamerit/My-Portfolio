import React from 'react';
import { ABOUT_TITLE, ABOUT_DESCRIPTION } from '../utils/constants';
import { Code, Lightbulb, Rocket, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <GraduationCap size={32} className="text-blue-600 dark:text-blue-400 sm:w-10 sm:h-10" />,
      title: 'VIT Bhopal Student',
      description: 'B.Tech CSE with specialization in AI & ML | Core Member - Blockchain Club | Passionate Tech Enthusiast.'
    },
    {
      icon: <Code size={32} className="text-blue-600 dark:text-blue-400 sm:w-10 sm:h-10" />,
      title: 'Developer & Researcher',
      description: 'Hands-on with Python, ML/DL, TensorFlow, Streamlit, Java, and Blockchain R&D with real-world projects.'
    },
    {
      icon: <Lightbulb size={32} className="text-blue-600 dark:text-blue-400 sm:w-10 sm:h-10" />,
      title: 'AI/ML Project Builder',
      description: 'Built intelligent apps like Weather Prediction, Cancer Detection, Smart City Dashboards, and KYC via Blockchain.'
    },
    {
      icon: <Rocket size={32} className="text-blue-600 dark:text-blue-400 sm:w-10 sm:h-10" />,
      title: 'Growth-Driven',
      description: 'Python & C++ HackerRank | Machine Learning Certified | Committed to impactful tech for society | 350+ Leetcode Question Solved.'
    }
  ];

  return (
    <section 
      id="about" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-100 via-indigo-50 to-slate-100 dark:from-slate-800 dark:via-blue-900 dark:to-slate-700 relative group cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 transform group-hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">{ABOUT_TITLE}</h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4 sm:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16 px-2 sm:px-4">
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 text-center lg:text-left">
            {ABOUT_DESCRIPTION}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-blue-900/30 border border-white/20 dark:border-slate-600/50"
            >
              <div className="mb-3 sm:mb-4 flex justify-center transform hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center text-slate-900 dark:text-white leading-tight">{item.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 text-center leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;