import React from 'react';
import { SOCIAL_LINKS } from '../utils/constants';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <a href="#home" className="text-2xl font-bold text-teal-400 mb-6">
            Uditya Narayan Tiwari
          </a>
          
          <div className="flex space-x-6 mb-8">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors"
                aria-label={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </div>
          
          <div className="w-24 h-0.5 bg-slate-700 mb-6"></div>
          
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6">
              <li><a href="#home" className="text-slate-400 hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-teal-400 transition-colors">About</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-teal-400 transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-slate-400 hover:text-teal-400 transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
          
          <p className="text-slate-400 text-center flex items-center gap-1">
            <span>© {getCurrentYear()} Uditya Narayan Tiwari Made with</span> 
            <Heart size={16} className="text-red-500" fill="currentColor" /> 
            <span>All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;