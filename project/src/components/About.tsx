import React from 'react';
import { ABOUT_TITLE, ABOUT_DESCRIPTION } from '../utils/constants';
import { Code, Lightbulb, Rocket, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <GraduationCap size={40} className="text-teal-600 dark:text-teal-400" />,
      title: 'VIT Bhopal Student',
      description: 'B.Tech CSE with specialization in AI & ML | Core Member - Blockchain Club | Passionate Tech Enthusiast.'
    },
    {
      icon: <Code size={40} className="text-teal-600 dark:text-teal-400" />,
      title: 'Developer & Researcher',
      description: 'Hands-on with Python, ML/DL, TensorFlow, Streamlit, Java, and Blockchain R&D with real-world projects.'
    },
    {
      icon: <Lightbulb size={40} className="text-teal-600 dark:text-teal-400" />,
      title: 'AI/ML Project Builder',
      description: 'Built intelligent apps like Weather Prediction, Cancer Detection, Smart City  Dashboards, and KYC via Blockchain.'
    },
    {
      icon: <Rocket size={40} className="text-teal-600 dark:text-teal-400" />,
      title: 'Growth-Driven',
      description: 'Python & C++ HackerRank | Machine Learning Certified | Committed to impactful tech for society | 350+ Leetcode Question Solved .'
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 bg-white dark:bg-slate-800 relative group cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 transform group-hover:scale-105 transition-transform duration-500">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ABOUT_TITLE}</h2>
          <div className="w-24 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
            {ABOUT_DESCRIPTION}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-slate-50 hover:to-teal-50 dark:hover:from-slate-700 dark:hover:to-teal-900/30"
            >
              <div className="mb-4 flex justify-center transform hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center">
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