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
      description: 'Built intelligent apps like Churn Prediction, Cancer Detection, Smart City Dashboards, and KYC via Blockchain.'
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
      className="py-20 bg-white dark:bg-slate-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ABOUT_TITLE}</h2>
          <div className="w-24 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-6"></div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {ABOUT_DESCRIPTION}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
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
