import React, { useState } from 'react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { Github, CheckCircle, Clock, Calendar, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const handleProjectClick = (url: string, projectTitle: string) => {
    // Link click tracking removed
  };

  const toggleDescription = (id: number) => {
    setExpandedProjects((prev) =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const getStatusConfig = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle size={20} className="sm:w-7 sm:h-7" />,
          label: 'Completed',
          bgColor: 'bg-green-500',
          textColor: 'text-white'
        };
      case 'ongoing':
        return {
          icon: <Clock size={20} className="sm:w-7 sm:h-7" />,
          label: 'Ongoing',
          bgColor: 'bg-blue-500',
          textColor: 'text-white'
        };
      case 'coming-soon':
        return {
          icon: <Calendar size={20} className="sm:w-7 sm:h-7" />,
          label: 'Coming Soon',
          bgColor: 'bg-orange-500',
          textColor: 'text-white'
        };
    }
  };

  return (
    <section 
      id="projects" 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-100 to-slate-100 dark:from-slate-800 dark:via-blue-900 dark:to-slate-700 relative group cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 transform group-hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">Projects</h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4 sm:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 px-2 sm:px-4">
            Showcasing my journey in AI, ML, and Software Development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project) => {
            const isExpanded = expandedProjects.includes(project.id);
            const shortDescription = project.description.slice(0, 100) + '...';
            const statusConfig = getStatusConfig(project.status);

            return (
              <div 
                key={project.id} 
                className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-blue-900/30 group/card relative border border-white/20 dark:border-slate-600/50"
              >
                {/* Status Tag - Appears on Hover */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/card:translate-y-0">
                  <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} shadow-lg backdrop-blur-sm`}>
                    {statusConfig.icon}
                    <span className="text-xs sm:text-sm font-medium">{statusConfig.label}</span>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative pb-[56.25%] overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Project Content */}
                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                    {isExpanded ? project.description : shortDescription}
                  </p>

                  {project.description.length > 100 && (
                    <button
                      onClick={() => toggleDescription(project.id)}
                      className="text-blue-600 dark:text-blue-300 text-xs sm:text-sm mb-3 sm:mb-4 hover:underline focus:outline-none"
                    >
                      {isExpanded ? 'View Less...' : 'View More...'}
                    </button>
                  )}

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full transform hover:scale-110 transition-transform duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {/* Demo Link - Primary Button */}
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleProjectClick(project.demo || '', project.title)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2.5 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base w-full justify-center transform hover:translate-y-[-2px] hover:shadow-lg font-medium"
                      >
                        <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                        Live Demo
                      </a>
                    )}
                    
                    {/* GitHub Link - Secondary Button */}
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleProjectClick(project.github || '', project.title)}
                      className="inline-flex items-center gap-2 bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base w-full justify-center transform hover:translate-y-[-2px] hover:shadow-lg"
                    >
                      <Github size={16} className="sm:w-5 sm:h-5" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;