import React, { useState } from 'react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { Github, CheckCircle, Clock, Calendar } from 'lucide-react';

const Projects: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const toggleDescription = (id: number) => {
    setExpandedProjects((prev) =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const getStatusConfig = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle size={30} />,
          label: 'Completed',
          bgColor: 'bg-green-500',
          textColor: 'text-white'
        };
      case 'ongoing':
        return {
          icon: <Clock size={30} />,
          label: 'Ongoing',
          bgColor: 'bg-blue-500',
          textColor: 'text-white'
        };
      case 'coming-soon':
        return {
          icon: <Calendar size={30} />,
          label: 'Coming Soon',
          bgColor: 'bg-orange-500',
          textColor: 'text-white'
        };
    }
  };

  return (
    <section 
      id="projects" 
      className="py-12 md:py-20 bg-white dark:bg-slate-800 relative group cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-8 md:mb-12 transform group-hover:scale-105 transition-transform duration-500">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-24 h-1 bg-teal-600 dark:bg-teal-400 mx-auto mb-4 md:mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
            Showcasing my journey in AI, ML, and Software Development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => {
            const isExpanded = expandedProjects.includes(project.id);
            const shortDescription = project.description.slice(0, 100) + '...';
            const statusConfig = getStatusConfig(project.status);

            return (
              <div 
                key={project.id} 
                className="bg-slate-50 dark:bg-slate-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-slate-50 hover:to-teal-50 dark:hover:from-slate-700 dark:hover:to-teal-900/30 group/card relative"
              >
                {/* Status Tag - Appears on Hover */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/card:translate-y-0">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor} shadow-lg backdrop-blur-sm`}>
                    {statusConfig.icon}
                    <span className="text-sm font-medium">{statusConfig.label}</span>
                  </div>
                </div>

                <div className="relative pb-[56.25%] overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-slate-900 dark:text-white line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-2">
                    {isExpanded ? project.description : shortDescription}
                  </p>

                  {project.description.length > 100 && (
                    <button
                      onClick={() => toggleDescription(project.id)}
                      className="text-teal-600 dark:text-teal-300 text-sm mb-4 hover:underline focus:outline-none"
                    >
                      {isExpanded ? 'View Less...' : 'View More...'}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs md:text-sm bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 rounded-full transform hover:scale-110 transition-transform duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base w-full justify-center transform hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    <Github size={18} />
                    View on GitHub
                  </a>
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