import React, { useState, useEffect } from 'react';
import { LESSONS } from './constants';
import { SlideView } from './components/SlideView';
import { AITutor } from './components/AITutor';
import { ThemeType } from './types';

const App: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState(LESSONS[0].id);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);

  const activeLesson = LESSONS.find(l => l.id === activeLessonId) || LESSONS[0];
  const currentSlide = activeLesson.slides[currentSlideIndex];

  // Theme Constants
  const getThemeStyles = (theme: ThemeType) => {
    switch (theme) {
      case 'microbiome': 
        return {
          wrapper: 'bg-slate-950',
          sidebar: 'bg-slate-900/80 border-slate-700',
          accent: 'text-cyan-400',
          button: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/50',
          text: 'text-slate-100'
        };
      case 'airbear': 
        return {
          wrapper: 'bg-black',
          sidebar: 'bg-green-950/30 border-green-900',
          accent: 'text-green-400',
          button: 'bg-green-700 hover:bg-green-600 shadow-green-900/50',
          text: 'text-green-50'
        };
      case 'economy': 
        return {
          wrapper: 'bg-[#fdfbf7]', // Cream
          sidebar: 'bg-white/90 border-stone-200',
          accent: 'text-ecoRed',
          button: 'bg-ecoRed hover:bg-red-700 shadow-red-900/20',
          text: 'text-stone-800'
        };
      default: return { wrapper: 'bg-gray-900', sidebar: 'bg-gray-800', accent: 'text-blue-500', button: 'bg-blue-600', text: 'text-white' };
    }
  };

  const themeStyles = getThemeStyles(activeLesson.theme);

  // Reset index on lesson change
  useEffect(() => {
    setCurrentSlideIndex(0);
    setMenuOpen(false);
  }, [activeLessonId]);

  const nextSlide = () => {
    if (currentSlideIndex < activeLesson.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, activeLessonId]);

  const progress = ((currentSlideIndex + 1) / activeLesson.slides.length) * 100;

  // Handle Score Updates from SlideView
  const handleScoreUpdate = (points: number) => {
    setSessionXP(prev => prev + points);
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans transition-colors duration-700 ${themeStyles.wrapper} ${themeStyles.text}`}>
      
      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 backdrop-blur-xl border-r transform transition-transform duration-500 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static flex flex-col ${themeStyles.sidebar}`}>
        
        {/* Logo Area */}
        <div className="p-8 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl shadow-lg flex items-center justify-center font-bold text-lg text-white bg-gradient-to-br from-gray-700 to-black`}>
            LD
          </div>
          <div>
            <h1 className={`text-xl font-bold tracking-tight`}>LingoDeck</h1>
            <p className="text-xs opacity-50 uppercase tracking-widest">Immersive Learning</p>
          </div>
        </div>
        
        {/* Lesson List */}
        <div className="px-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] uppercase font-bold opacity-40 px-4 mb-2 tracking-widest">Select Mission</div>
          {LESSONS.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeLessonId === lesson.id ? 'bg-black/5 dark:bg-white/10 shadow-md ring-1 ring-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <div className="relative z-10">
                <div className={`font-bold mb-1 ${activeLessonId === lesson.id ? themeStyles.accent : 'opacity-80'}`}>{lesson.title}</div>
                <div className="text-xs opacity-60 truncate">{lesson.subtitle}</div>
              </div>
              {activeLessonId === lesson.id && (
                 <div className={`absolute left-0 top-0 bottom-0 w-1 ${themeStyles.button}`}></div>
              )}
            </button>
          ))}
        </div>

        {/* User Stats */}
        <div className="p-6 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 backdrop-blur-md">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs uppercase font-bold opacity-60">Session XP</span>
             <span className={`text-sm font-mono font-bold ${themeStyles.accent}`}>{sessionXP} XP</span>
           </div>
           <div className="w-full h-1.5 bg-gray-500/20 rounded-full overflow-hidden">
             <div className={`h-full ${themeStyles.button} transition-all duration-1000`} style={{ width: `${Math.min(sessionXP / 20, 100)}%` }}></div>
           </div>
           <div className="mt-4 text-[10px] opacity-40 text-center flex justify-center gap-4">
             <span>← Prev</span>
             <span>Space / → Next</span>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative h-full w-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden flex-none p-4 flex justify-between items-center z-30 backdrop-blur-md bg-black/5">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 opacity-80 hover:opacity-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="font-bold truncate text-sm">{activeLesson.title}</span>
          <div className={`text-xs font-mono font-bold ${themeStyles.accent}`}>{sessionXP} XP</div>
        </div>

        {/* Progress Bar (Top) */}
        <div className="h-1 w-full bg-gray-500/10 z-20">
           <div 
             className={`h-full transition-all duration-500 ease-out shadow-[0_0_10px_currentColor] ${themeStyles.button} text-white`}
             style={{ width: `${progress}%` }}
           ></div>
        </div>

        {/* Slide Render Area */}
        <div className="flex-1 relative w-full h-full overflow-hidden">
           {/* We pass a key to force re-render animation on slide change if desired, or handle internal transition */}
           <SlideView 
              key={currentSlide.id} 
              slide={currentSlide} 
              theme={activeLesson.theme} 
              onScore={handleScoreUpdate}
           />
        </div>

        {/* Navigation Floating Controls (Desktop/Mobile unified) */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto bg-black/80 dark:bg-white/10 backdrop-blur-lg p-2 rounded-full border border-white/10 shadow-2xl">
             
             <button 
               onClick={prevSlide}
               disabled={currentSlideIndex === 0}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-white`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>

             <div className="px-4 text-xs font-mono opacity-60 text-white min-w-[80px] text-center">
               {currentSlideIndex + 1} / {activeLesson.slides.length}
             </div>

             <button 
               onClick={nextSlide}
               disabled={currentSlideIndex === activeLesson.slides.length - 1}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg ${themeStyles.button}`}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>

          </div>
        </div>

        {/* AI Tutor */}
        <AITutor currentSlide={currentSlide} themeColor={themeStyles.button} theme={activeLesson.theme} />

      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;