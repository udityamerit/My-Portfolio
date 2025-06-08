import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { HERO_TITLE, HERO_SUBTITLE, HERO_DESCRIPTION } from '../utils/constants';
import Typed from 'typed.js';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

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
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto py-8 md:py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6">
            <div className="animate-fade-in">
              <p className="text-teal-600 dark:text-teal-400 font-medium mb-2">Hello, I'm</p>
              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-2 leading-tight min-h-[1.2em]"></h1>
              <h2 ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-4 md:mb-6 min-h-[1.2em]"></h2>
              <p ref={descriptionRef} className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 min-h-[1.2em]"></p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors text-center"
                >
                  Get in touch
                </a>
                <a 
                  href="#projects" 
                  className="w-full sm:w-auto bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:border-teal-600 dark:hover:border-teal-400 px-6 py-3 rounded-md font-medium transition-colors text-center"
                >
                  View my work
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6">
                <a 
                  href="https://github.com/udityamerit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:uditmerit@gmail.com" 
                  className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  aria-label="Email Me"
                >
                  <Mail size={24} />
                </a>
                <a 
                  href="https://leetcode.com/u/Uditya_Narayan_Tiwari/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  aria-label="LeetCode Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <path d="M23.347 5.532L11.664 16.91a2.025 2.025 0 000 2.78l11.683 11.38a1.572 1.572 0 002.212-.064 1.576 1.576 0 00-.064-2.213L15.665 17.9l7.952-7.873a1.576 1.576 0 10-2.27-2.495zM8.073 7.665L.999 14.8a1.578 1.578 0 00-.043 2.217l6.892 6.961a1.571 1.571 0 002.236-.007 1.569 1.569 0 00-.011-2.22l-4.322-4.343a.9.9 0 01-.27-.662v-1.63c0-.255.11-.5.298-.665l4.327-4.346a1.567 1.567 0 00-.034-2.1 1.572 1.572 0 00-2.078-.095z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-full bg-gradient-to-br from-teal-500 to-blue-600 opacity-20 dark:opacity-30 animate-pulse"></div>
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D22AQHpaZPE8htZAw/feedshare-shrink_1280/feedshare-shrink_1280/0/1725278850755?e=1751500800&v=beta&t=ylZ52mLJGOWwMMzhmCexmm-Mu3yUzK2b01VHuO3qcw4" 
                alt="AI Student" 
                className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-lg relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-teal-600 dark:text-teal-400 font-bold text-sm sm:text-base">Learner</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#about" aria-label="Scroll down">
            <ChevronDown className="text-slate-600 dark:text-slate-400" size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
