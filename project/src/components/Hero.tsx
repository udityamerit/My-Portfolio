import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Globe, Youtube } from 'lucide-react';
import { HERO_TITLE, HERO_SUBTITLE, HERO_DESCRIPTION } from '../utils/constants';
import Typed from 'typed.js';
import { RESUME_URL } from '../utils/constants';
import { Download } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleSocialClick = (url: string, platform: string) => {
    // Link click tracking removed
  };

  const startTypingSequence = () => {
    if (!titleRef.current || !subtitleRef.current || !descriptionRef.current) return;

    titleRef.current.innerHTML = '';
    subtitleRef.current.innerHTML = '';
    descriptionRef.current.innerHTML = '';

    const titleTyped = new Typed(titleRef.current, {
      strings: [HERO_TITLE],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: false,
      showCursor: false,
      onComplete: () => {
        const subtitleTyped = new Typed(subtitleRef.current!, {
          strings: [HERO_SUBTITLE],
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 1500,
          loop: false,
          showCursor: false,
          onComplete: () => {
            const descriptionTyped = new Typed(descriptionRef.current!, {
              strings: [HERO_DESCRIPTION],
              typeSpeed: 30,
              backSpeed: 20,
              backDelay: 2000,
              loop: false,
              showCursor: false,
              onComplete: () => {
                setTimeout(() => {
                  // Restart typing
                  titleTyped.destroy();
                  subtitleTyped.destroy();
                  descriptionTyped.destroy();
                  startTypingSequence();
                }, 1000);
              },
            });
          },
        });
      },
    });
  };

  useEffect(() => {
    startTypingSequence();
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 pt-16 px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="container mx-auto py-4 sm:py-6 md:py-8 lg:py-16 max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-3 sm:space-y-4 md:space-y-6">
            <div className="animate-fade-in">
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-2 text-sm sm:text-base">Hello, I'm</p>
              <h1 ref={titleRef} className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white mb-2 leading-tight min-h-[1.2em]"></h1>
              <h2 ref={subtitleRef} className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-3 sm:mb-4 md:mb-6 min-h-[1.2em]"></h2>
              <p ref={descriptionRef} className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-6 md:mb-8 min-h-[1.2em] leading-relaxed"></p>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                <a 
                  href="#contact" 
                  className="w-full xs:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium transition-colors text-center text-sm sm:text-base"
                >
                  Get in touch
                </a>
                <a 
                  href="#projects" 
                  className="w-full xs:w-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:border-blue-600 dark:hover:border-blue-400 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium transition-colors text-center text-sm sm:text-base"
                >
                  View my work
                </a>
                <a 
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full xs:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium transition-all duration-300 text-center text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Download size={16} className="sm:w-5 sm:h-5" />
                  Download Resume
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <a 
                  href="https://github.com/udityamerit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('https://github.com/udityamerit', 'github')}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/', 'linkedin')}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a 
                  href="mailto:uditmerit@gmail.com" 
                  onClick={() => handleSocialClick('mailto:uditmerit@gmail.com', 'email')}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                  aria-label="Email Me"
                >
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a 
                  href="https://leetcode.com/u/Uditya_Narayan_Tiwari/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('https://leetcode.com/u/Uditya_Narayan_Tiwari/', 'leetcode')}
                  className="hover:scale-110 transition-transform p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                  aria-label="LeetCode Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <path d="M23.347 5.532L11.664 16.91a2.025 2.025 0 000 2.78l11.683 11.38a1.572 1.572 0 002.212-.064 1.576 1.576 0 00-.064-2.213L15.665 17.9l7.952-7.873a1.576 1.576 0 10-2.27-2.495zM8.073 7.665L.999 14.8a1.578 1.578 0 00-.043 2.217l6.892 6.961a1.571 1.571 0 002.236-.007 1.569 1.569 0 00-.011-2.22l-4.322-4.343a.9.9 0 01-.27-.662v-1.63c0-.255.11-.5.298-.665l4.327-4.346a1.567 1.567 0 00-.034-2.1 1.572 1.572 0 00-2.078-.095z" />
                  </svg>
                </a>
                <a 
                  href="https://udityaknowledgebase.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('https://udityaknowledgebase.netlify.app/', 'knowledge-base')}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                  aria-label="Knowledge Base"
                >
                  <Globe size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a 
                  href="https://www.youtube.com/@KGPTalkie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick('https://www.youtube.com/@KGPTalkie', 'youtube')}
                  className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  aria-label="KGP Talkie YouTube"
                >
                  <Youtube size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-6 sm:mb-8 lg:mb-0">
            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
              {/* Thick Border with Running Light */}
              <div className="absolute inset-0 rounded-full p-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 via-green-500 via-cyan-500 to-blue-500 animate-border-run">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 border-4 border-transparent"></div>
              </div>
              
              {/* Outer Glow Effect */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-400/40 via-purple-400/40 via-pink-400/40 to-cyan-400/40 blur-lg animate-glow-pulse"></div>
              
              {/* Inner Glow Ring */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              
              <img 
                src="https://avatars.githubusercontent.com/u/138104365?v=4" 
                alt="AI Student" 
                className="w-full h-full object-cover rounded-full shadow-2xl relative z-10 border-2 border-white/50 dark:border-slate-700/50"
              />
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <a href="#about" aria-label="Scroll down">
            <ChevronDown className="text-slate-600 dark:text-slate-400" size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;