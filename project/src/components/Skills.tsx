import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, education, experience } from '../data/skills';
import { SKILLS_TITLE, SKILLS_SUBTITLE } from '../utils/constants';
import { Calendar, Github, Linkedin, Code2, Trophy, GraduationCap, Award } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [activeCategory, setActiveCategory] = useState<string>('all');
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
  
  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Software' },
    { id: 'softSkills', label: 'Soft Skills' }
  ];

  const tabs = [
    { id: 'skills', label: 'Skills', icon: <Code2 size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Trophy size={20} /> },
    { id: 'achievements', label: 'Achievements', icon: <Award size={20} /> }
  ];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

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
      className="py-20 bg-white dark:bg-slate-800"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{SKILLS_TITLE}</h2>
          <div className="w-24 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400">{SKILLS_SUBTITLE}</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <>
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
             {filteredSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                    <motion.div 
                      className="bg-teal-600 dark:bg-teal-400 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.level / 5) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
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
                className="relative pl-8 pb-8 border-l-2 border-teal-600 dark:border-teal-400 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-teal-600 dark:bg-teal-400 rounded-full"></div>
                <motion.div 
                  className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{edu.period}</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-1">{edu.degree}</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
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
                className="relative pl-8 pb-8 border-l-2 border-teal-600 dark:border-teal-400 last:pb-0"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-teal-600 dark:bg-teal-400 rounded-full"></div>
                <motion.div 
                  className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-1">{exp.role}</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    {exp.organization}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                    {exp.description}
                  </p>
                  {exp.links && (
                    <div className="mt-4 flex gap-4">
                      {exp.links.github && (
                        <motion.a 
                          href={exp.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={18} />
                          GitHub
                        </motion.a>
                      )}
                      {exp.links.linkedin && (
                        <motion.a 
                          href={exp.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Linkedin size={18} />
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
        
 {activeTab === "achievements" && (
  <motion.div
    className="max-w-7xl mx-auto px-4 py-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="flex flex-wrap justify-center gap-8">
      
      {/* LeetCode Achievement */}
      <motion.div
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full md:w-[48%] lg:w-[30%] hover:shadow-xl transition-shadow duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3 text-teal-600 dark:text-teal-400">
          <Code2 size={28} />
          LeetCode Achievement
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Problems Solved</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-800 dark:text-gray-200 font-medium">350+ Questions</span>
              <motion.div
                className="w-40 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="h-full bg-teal-600 dark:bg-teal-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 1.5 }}
                />
              </motion.div>
            </div>
          </div>
          <a
            href="https://leetcode.com/u/Uditya_Narayan_Tiwari/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            View LeetCode Profile &rarr;
          </a>
        </div>
      </motion.div>

      {/* Hackathon Winner */}
      <motion.div
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full md:w-[48%] lg:w-[30%] hover:shadow-xl transition-shadow duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3 text-teal-600 dark:text-teal-400">
          <Code2 size={28} />
          Hackathon Winner
        </h3>
        <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          <p><span className="font-semibold">Event:</span> InnovMinds Expo Hackathon</p>
          <p><span className="font-semibold">Achievement:</span> 1st Place</p>
          <p><span className="font-semibold">Project:</span> Tech-based dementia care solution</p>
          <p><span className="font-semibold">Organizer:</span> VIT Bhopal University</p>
          <a
            href="https://www.linkedin.com/posts/uditya-narayan-tiwari-562332289_hackathonwinner-techforgood-dementiacare-activity-7299366631191801858-rRut"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            View LinkedIn Post &rarr;
          </a>
        </div>
      </motion.div>

      {/* Certifications Card 1 */}
      <motion.div
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full md:w-[48%] lg:w-[30%] hover:shadow-xl transition-shadow duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3 text-teal-600 dark:text-teal-400">
          <Code2 size={28} />
          Certifications
        </h3>
        <ul className="list-disc list-inside space-y-3 text-gray-800 dark:text-gray-300 text-sm">
          <li>
            <span className="font-semibold">Python for Data Science</span> – Simplilearn
          </li>
          <li>
            <span className="font-semibold">Geodata Processing Using Python</span> – ISRO
          </li>
        </ul>
        <a
          href="https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/details/certifications/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
        >
          View More &rarr;
        </a>
      </motion.div>

      {/* Certifications Card 2 */}
      <motion.div
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full md:w-[48%] lg:w-[30%] hover:shadow-xl transition-shadow duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <h3 className="text-2xl font-extrabold mb-5 flex items-center gap-3 text-teal-600 dark:text-teal-400">
          <Code2 size={28} />
          Certifications
        </h3>
        <ul className="list-disc list-inside space-y-3 text-gray-800 dark:text-gray-300 text-sm">
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
          className="inline-block mt-5 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
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