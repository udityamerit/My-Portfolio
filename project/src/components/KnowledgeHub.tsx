import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Globe, 
  Youtube, 
  ExternalLink, 
  BookOpen, 
  Video, 
  Users, 
  Play,
  Code,
  Lightbulb,
  Star
} from 'lucide-react';

const KnowledgeHub: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleLinkClick = (url: string, type: 'website' | 'youtube') => {
    // Link click tracking removed
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const knowledgeResources = [
    {
      type: 'website',
      title: 'Uditya Knowledge Base',
      description: 'Comprehensive technical documentation, tutorials, and insights from my learning journey. Covering AI/ML, programming concepts, and practical implementations.',
      url: 'https://udityaknowledgebase.netlify.app/',
      icon: <Globe size={32} className="text-blue-600 dark:text-blue-400" />,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Technical Tutorials',
        'AI/ML Guides',
        'Code Examples',
        'Best Practices'
      ],
      stats: {
        label: 'Articles & Guides',
        value: '50+'
      }
    },
    {
      type: 'youtube',
      title: 'KGP Talkie',
      description: 'Educational content focused on programming, technology trends, and career guidance for aspiring developers and tech enthusiasts.',
      url: 'https://www.youtube.com/@KGPTalkie',
      icon: <Youtube size={32} className="text-red-600 dark:text-red-400" />,
      gradient: 'from-red-500 to-pink-500',
      features: [
        'Programming Tutorials',
        'Tech Career Tips',
        'Industry Insights',
        'Live Sessions'
      ],
      stats: {
        label: 'Educational Content',
        value: 'Latest'
      }
    },
    {
      type: 'youtube',
      title: 'Code Fusion Hindi',
      description: 'Hindi programming tutorials making coding accessible to Indian developers. Covering fundamentals to advanced concepts in native language.',
      url: 'https://www.youtube.com/@CODEFUSIONHINDI',
      icon: <Code size={32} className="text-green-600 dark:text-green-400" />,
      gradient: 'from-green-500 to-emerald-500',
      features: [
        'Hindi Tutorials',
        'Beginner Friendly',
        'Practical Examples',
        'Step-by-step Guides'
      ],
      stats: {
        label: 'Hindi Content',
        value: 'Growing'
      }
    }
  ];

  return (
    <section 
      id="knowledge-hub" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900"
      ref={ref}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
            Knowledge Hub
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 px-2 sm:px-4 max-w-3xl mx-auto">
            Sharing knowledge through comprehensive documentation, tutorials, and educational content across multiple platforms
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {knowledgeResources.map((resource, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${resource.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Header */}
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${resource.gradient} shadow-lg`}>
                    {resource.icon}
                  </div>
                  <motion.a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(resource.url, resource.type as 'website' | 'youtube')}
                    className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-3 py-2 rounded-lg transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    Visit
                  </motion.a>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {resource.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {resource.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {resource.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {resource.stats.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {resource.stats.label}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(resource.url, resource.type as 'website' | 'youtube')}
                  className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${resource.gradient} text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg group-hover:shadow-xl`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {resource.type === 'youtube' ? (
                    <>
                      <Play size={18} />
                      Watch Content
                    </>
                  ) : (
                    <>
                      <BookOpen size={18} />
                      Explore Knowledge
                    </>
                  )}
                </motion.a>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 dark:border-slate-700/50 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="text-yellow-500" size={32} />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Join the Learning Journey
              </h3>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Subscribe to my channels and bookmark the knowledge base to stay updated with the latest tutorials, insights, and technical content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://udityaknowledgebase.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick('https://udityaknowledgebase.netlify.app/', 'website')}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={20} />
                Visit Knowledge Base
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@KGPTalkie"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick('https://www.youtube.com/@KGPTalkie', 'youtube')}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube size={20} />
                Subscribe to KGP Talkie
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeHub;