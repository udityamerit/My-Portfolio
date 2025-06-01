import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download, GraduationCap, Trophy, Award, AlignCenterVertical as Certificate } from 'lucide-react';
import { RESUME_URL } from '../utils/constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update header style on scroll
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const currentScroll = window.scrollY;

        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.split('#')[1].split('?')[0];
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offset = 80; // Height of fixed header
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL without scrolling
      window.history.pushState(null, '', href);
      
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills', icon: <Trophy size={16} /> },
    { name: 'Education', href: '#skills?tab=education', icon: <GraduationCap size={16} /> },
    { name: 'Experience', href: '#skills?tab=experience', icon: <Certificate size={16} /> },
    { name: 'Achievements', href: '#skills?tab=achievements', icon: <Award size={16} /> },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-xl font-bold text-teal-600 dark:text-teal-400"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          Uditya Narayan Tiwari
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`flex items-center gap-1.5 transition-colors ${
                (activeSection === link.href.split('#')[1]?.split('?')[0] ||
                (link.href.includes('skills') && activeSection === 'skills'))
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              {link.icon && link.icon}
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a
              href={RESUME_URL}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} />
              Resume
            </a>
          </div>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

{/* Mobile Menu */}
{isMenuOpen && (
  <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={(e) => handleNavClick(e, link.href)}
          className={`flex items-center gap-2 py-2 transition-colors ${
            (activeSection === link.href.split('#')[1]?.split('?')[0] ||
            (link.href.includes('skills') && activeSection === 'skills'))
              ? 'text-teal-600 dark:text-teal-400'
              : 'text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400'
          }`}
        >
          {link.icon && link.icon}
          {link.name}
        </a>
      ))}

      {/* Resume Button */}
      <a
        href="https://drive.google.com/file/d/1pD3b9Zi2YDtsSLlabmAAk_XuE4oe55EU/view?usp=drive_link"
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-fit transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V4" />
        </svg>
        Resume
      </a>
    </div>
  </div>
)}

    </header>
  );
};

export default Header;