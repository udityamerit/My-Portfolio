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
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
      const offset = 80;
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      window.history.pushState(null, '', href);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills', icon: <Trophy size={20} /> },
    { name: 'Education', href: '#skills?tab=education', icon: <GraduationCap size={20} /> },
    { name: 'Experience', href: '#skills?tab=experience', icon: <Certificate size={20} /> },
    { name: 'Achievements', href: '#skills?tab=achievements', icon: <Award size={20} /> },
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
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#home" 
            className="text-2xl font-bold text-teal-600 dark:text-teal-400"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            Uditya Narayan Tiwari
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center gap-2 text-lg font-medium transition-colors ${
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
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              
              <a
                href={RESUME_URL}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md transition-colors text-lg font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={20} />
                Resume
              </a>
            </div>
          </nav>

          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-slate-700 dark:text-slate-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg mt-4 rounded-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-2 py-2 text-lg font-medium transition-colors ${
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

              <a
                href={RESUME_URL}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md w-fit transition-colors text-lg font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={20} />
                Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;