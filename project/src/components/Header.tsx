import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, GraduationCap, Trophy, Code, Download } from 'lucide-react';
import { RESUME_URL } from '../utils/constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Set dark mode as default on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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
    { name: 'Coding', href: '#coding-profiles', icon: <Code size={16} className="sm:w-5 sm:h-5" /> },
    { name: 'Skills', href: '#skills', icon: <Trophy size={16} className="sm:w-5 sm:h-5" /> },
    { name: 'Education', href: '#skills?tab=education', icon: <GraduationCap size={16} className="sm:w-5 sm:h-5" /> },
    { name: 'Knowledge', href: '#knowledge-hub' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 truncate"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <span className="hidden sm:inline">Uditya Narayan Tiwari</span>
            <span className="sm:hidden">Uditya N.T.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative flex items-center gap-2 py-3 px-4 text-base sm:text-lg font-medium transition-all duration-300 rounded-lg ${
                  (activeSection === link.href.split('#')[1]?.split('?')[0] ||
                  (link.href.includes('skills') && activeSection === 'skills') ||
                  (link.href.includes('coding-profiles') && activeSection === 'coding-profiles'))
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transform scale-105'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105'
                }`}
              >
                {link.icon && link.icon}
                <span className="hidden xl:inline">{link.name}</span>
                <span className="xl:hidden">{link.name.split(' ')[0]}</span>
              </a>
            ))}
            
            <div className="flex items-center space-x-2 xl:space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-slate-700 dark:text-slate-200 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} className="sm:w-6 sm:h-6" /> : <Moon size={20} className="sm:w-6 sm:h-6" />}
              </button>
              
              <a
                href={RESUME_URL}
                className="flex items-center gap-1 xl:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 xl:px-6 py-2 xl:py-3 rounded-md transition-colors text-sm xl:text-base font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-slate-700 dark:text-slate-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} className="sm:w-6 sm:h-6" /> : <Moon size={20} className="sm:w-6 sm:h-6" />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-slate-700 dark:text-slate-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg mt-4 rounded-lg border border-white/20 dark:border-slate-700/50 max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-3 sm:px-4 py-4 flex flex-col space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-2 py-2 text-base sm:text-lg font-medium transition-colors ${
                    (activeSection === link.href.split('#')[1]?.split('?')[0] ||
                    (link.href.includes('skills') && activeSection === 'skills') ||
                    (link.href.includes('coding-profiles') && activeSection === 'coding-profiles'))
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                </a>
              ))}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;