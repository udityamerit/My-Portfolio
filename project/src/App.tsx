// udityamerit/my-portfolio/My-Portfolio-main/project/src/App.tsx
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CodingProfiles from './components/CodingProfiles'; // Yeh import rakhein
import Skills from './components/Skills';
import KnowledgeHub from './components/KnowledgeHub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Chatbot from './components/Chatbot';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Cursor />
      <Header />

      <main>
        <Hero />
        <About />
        <Projects />
        <CodingProfiles /> {/* Yahan par component ko render karein */}
        <Skills />
        <KnowledgeHub />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;