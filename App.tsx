import React, { useState, useEffect } from 'react';
import { LESSONS } from './constants';
import { SlideView } from './components/SlideView';
import { AITutor } from './components/AITutor';

const App: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState(LESSONS[0].id);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLesson = LESSONS.find(l => l.id === activeLessonId) || LESSONS[0];
  const currentSlide = activeLesson.slides[currentSlideIndex];

  // Reset slide index when lesson changes
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
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, activeLessonId]);

  const getThemeColor = () => {
    switch (activeLesson.theme) {
      case 'microbiome': return 'bg-cyan-600';
      case 'airbear': return 'bg-green-600';
      case 'economy': return 'bg-red-700';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-gray-900">
      
      {/* Sidebar Navigation (Desktop) / Drawer (Mobile) */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out border-r border-gray-800 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static flex flex-col`}>
        <div className="p-6 border-b border-gray-800 flex items-center gap-3 flex-none">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">LD</div>
          <h1 className="text-xl font-bold tracking-tight">LingoDeck</h1>
        </div>
        
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase font-bold px-2 mb-2">Lessons</p>
          {LESSONS.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${activeLessonId === lesson.id ? 'bg-gray-800 text-white font-medium ring-1 ring-gray-700' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}`}
            >
              <div className="mb-1">{lesson.title}</div>
              <div className="text-xs opacity-60 truncate">{lesson.subtitle}</div>
            </button>
          ))}
        </div>

        <div className="flex-none w-full p-4 border-t border-gray-800">
           <div className="text-xs text-gray-500 text-center">
             Use Arrow Keys to Navigate
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full w-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden flex-none p-4 bg-gray-900 text-white flex justify-between items-center border-b border-gray-800 z-30">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            ☰
          </button>
          <span className="font-bold truncate">{activeLesson.title}</span>
          <div className="w-8"></div> {/* Spacer */}
        </div>

        {/* Slide View Container */}
        <div className="flex-1 relative overflow-hidden bg-gray-900">
           <SlideView slide={currentSlide} theme={activeLesson.theme} />
        </div>

        {/* Bottom Controls Bar */}
        <div className={`flex-none h-16 border-t flex items-center justify-between px-6 z-30 ${activeLesson.theme === 'economy' ? 'bg-white border-stone-200 text-stone-800' : 'bg-gray-900 border-gray-800 text-white'}`}>
          <div className="flex items-center gap-4 text-xs md:text-sm font-medium opacity-60">
             Slide {currentSlideIndex + 1} / {activeLesson.slides.length}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className={`p-2 px-4 rounded-lg border transition-all text-xs md:text-sm ${currentSlideIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-500/20'}`}
            >
              Previous
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === activeLesson.slides.length - 1}
              className={`p-2 px-4 rounded-lg transition-all font-bold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm ${getThemeColor()}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-none h-1 w-full bg-gray-700">
           <div 
             className={`h-full transition-all duration-300 ${getThemeColor()}`}
             style={{ width: `${((currentSlideIndex + 1) / activeLesson.slides.length) * 100}%` }}
           ></div>
        </div>

        {/* AI Tutor Floating Button */}
        <AITutor currentSlide={currentSlide} themeColor={getThemeColor()} />

      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;