import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  skillClusters, 
  machineLearningSkills, 
  programmingLanguages, 
  dataScienceTools, 
  developmentTools, 
  softSkills,
  education, 
  experience 
} from '../data/skills';
import { SKILLS_TITLE, SKILLS_SUBTITLE } from '../utils/constants';
import { Calendar, Github, Linkedin, Code2, Trophy, GraduationCap, Award } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Handle URL parameters for tab navigation
  useEffect(() => {
    const handleUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
      const tab = urlParams.get('tab');
      if (tab && ['skills', 'education', 'experience', 'achievements'].includes(tab)) {
        setActiveTab(tab);
      }
    };

    // Initial check
    handleUrlParams();

    // Listen for hash changes
    window.addEventListener('hashchange', handleUrlParams);
    return () => window.removeEventListener('hashchange', handleUrlParams);
  }, []);

  const tabs = [
    { id: 'skills', label: 'Skills', icon: <Code2 size={16} className="sm:w-5 sm:h-5" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} className="sm:w-5 sm:h-5" /> },
    { id: 'experience', label: 'Experience', icon: <Trophy size={16} className="sm:w-5 sm:h-5" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={16} className="sm:w-5 sm:h-5" /> }
  ];

  const skillCategories = [
    { 
      title: 'Machine Learning & AI', 
      skills: machineLearningSkills,
      description: 'Core AI/ML technologies and frameworks'
    },
    { 
      title: 'Programming Languages', 
      skills: programmingLanguages,
      description: 'Primary programming languages and frameworks'
    },
    { 
      title: 'Data Science & Analytics', 
      skills: dataScienceTools,
      description: 'Data manipulation and visualization tools'
    },
    { 
      title: 'Development & Collaboration', 
      skills: developmentTools,
      description: 'Development tools and emerging technologies'
    },
    { 
      title: 'Leadership & Communication', 
      skills: softSkills,
      description: 'Professional and interpersonal skills'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9 }
    }
  };

  return (
    <section 
      id="skills" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-900"
      ref={ref}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">{SKILLS_TITLE}</h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 px-2 sm:px-4">{SKILLS_SUBTITLE}</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-lg shadow-lg max-w-full overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {tab.icon}
                <span className="hidden xs:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <motion.div 
            className="space-y-8 sm:space-y-10 md:space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 dark:border-slate-700/50"
              >
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    const percentage = (skill.level / 5) * 100;
                    
                    return (
                      <motion.div
                        key={skillIndex}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <div className={`p-2 sm:p-3 rounded-full bg-gradient-to-br ${skill.color} shadow-lg`}>
                              <IconComponent size={20} className="text-white drop-shadow-sm sm:w-8 sm:h-8" />
                            </div>
                          </div>
                          
                          <h4 className="text-sm sm:text-base md:text-lg font-semibold text-center mb-3 sm:mb-4 leading-tight text-slate-900 dark:text-white">
                            {skill.name}
                          </h4>
                          
                          {/* Percentage Bar Only */}
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                                Proficiency
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                                {percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 sm:h-2.5 overflow-hidden">
                              <motion.div 
                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-sm`}
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${percentage}%` } : { width: 0 }}
                                transition={{ 
                                  duration: 1.5, 
                                  delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                  ease: "easeOut"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-full blur-xl"></div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Education Section */}
        {activeTab === 'education' && (
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l-2 border-blue-600 dark:border-blue-400 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full shadow-md"></div>
                <motion.div 
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-white/20 dark:border-slate-700/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-2">
                    <Calendar size={14} className="mr-2 sm:w-4 sm:h-4" />
                    <span>{edu.period}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-1 text-slate-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-2">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Experience Section */}
        {activeTab === 'experience' && (
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 pb-6 sm:pb-8 border-l-2 border-blue-600 dark:border-blue-400 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full shadow-md"></div>
                <motion.div 
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-white/20 dark:border-slate-700/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-2">
                    <Calendar size={14} className="mr-2 sm:w-4 sm:h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-1 text-slate-900 dark:text-white">{exp.role}</h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-2">
                    {exp.organization}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.links && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {exp.links.github && (
                        <motion.a 
                          href={exp.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm sm:text-base"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={16} className="sm:w-5 sm:h-5" />
                          GitHub
                        </motion.a>
                      )}
                      {exp.links.linkedin && (
                        <motion.a 
                          href={exp.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm sm:text-base"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Linkedin size={16} className="sm:w-5 sm:h-5" />
                          LinkedIn
                        </motion.a>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Achievements Section */}
        {activeTab === "achievements" && (
          <motion.div
            className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              
              {/* LeetCode Achievement */}
              <motion.div
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full sm:w-[48%] lg:w-[30%] hover:shadow-2xl transition-shadow duration-300 border border-white/20 dark:border-slate-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400">
                  <Code2 size={20} className="sm:w-7 sm:h-7" />
                  LeetCode Achievement
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 text-gray-700 dark:text-gray-300">Problems Solved</p>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">400+ Questions</span>
                      <span className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-bold">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <a
                    href="https://leetcode.com/u/Uditya_Narayan_Tiwari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    View LeetCode Profile &rarr;
                  </a>
                </div>
              </motion.div>

              {/* Hackathon Winner */}
              <motion.div
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full sm:w-[48%] lg:w-[30%] hover:shadow-2xl transition-shadow duration-300 border border-white/20 dark:border-slate-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400">
                  <Trophy size={20} className="sm:w-7 sm:h-7" />
                  Hackathon Winner
                </h3>
                <div className="space-y-2 sm:space-y-3 text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  <p><span className="font-semibold">Event:</span> InnovMinds Expo Hackathon</p>
                  <p><span className="font-semibold">Achievement:</span> 1st Place</p>
                  <p><span className="font-semibold">Project:</span> Tech-based dementia care solution</p>
                  <p><span className="font-semibold">Organizer:</span> VIT Bhopal University</p>
                  <a
                    href="https://www.linkedin.com/posts/uditya-narayan-tiwari-562332289_hackathonwinner-techforgood-dementiacare-activity-7299366631191801858-rRut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 sm:mt-4 text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    View LinkedIn Post &rarr;
                  </a>
                </div>
              </motion.div>

              {/* Certifications Card */}
              <motion.div
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full sm:w-[48%] lg:w-[30%] hover:shadow-2xl transition-shadow duration-300 border border-white/20 dark:border-slate-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400">
                  <Award size={20} className="sm:w-7 sm:h-7" />
                  Certifications
                </h3>
                <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-800 dark:text-gray-300 text-xs sm:text-sm">
                  <li>
                    <span className="font-semibold">Machine Learning Basics</span> – Pantak
                  </li>
                  <li>
                    <span className="font-semibold">AI & ML in Geodata Analysis</span> – ISRO
                  </li>
                   <li>
                    <span className="font-semibold">Google Cloud AI </span> – Simplilearn
                  </li>
                   <li>
                    <span className="font-semibold">Introduction to Reliable Deep Learning </span> – Google Cloud
                  </li>
                </ul>
                <a
                  href="https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/details/certifications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 sm:mt-5 text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  View More &rarr;
                </a>
              </motion.div>

            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;