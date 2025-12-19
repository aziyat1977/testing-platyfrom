import React, { useState, useEffect } from 'react';
import { Slide, ThemeType } from '../types';

interface SlideViewProps {
  slide: Slide;
  theme: ThemeType;
}

const getThemeStyles = (theme: ThemeType) => {
  switch (theme) {
    case 'microbiome':
      return {
        bg: 'bg-slate-900',
        text: 'text-gray-100',
        accent: 'text-cyan-400',
        accentBg: 'bg-cyan-900/30',
        border: 'border-cyan-500/30',
        card: 'bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-cyan-900/50',
        fontHead: 'font-sans',
        fontBody: 'font-sans',
        gradient: 'from-cyan-500/20 to-blue-600/20'
      };
    case 'airbear':
      return {
        bg: 'bg-black',
        text: 'text-green-50',
        accent: 'text-green-400',
        accentBg: 'bg-green-900/20',
        border: 'border-green-500',
        card: 'bg-gray-900 border border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.15)]',
        fontHead: 'font-mono tracking-tighter',
        fontBody: 'font-mono',
        gradient: 'from-green-500/20 to-emerald-900/20'
      };
    case 'economy':
      return {
        bg: 'bg-stone-50',
        text: 'text-stone-800',
        accent: 'text-red-700',
        accentBg: 'bg-stone-200',
        border: 'border-stone-300',
        card: 'bg-white shadow-xl border-t-4 border-red-700',
        fontHead: 'font-serif',
        fontBody: 'font-sans',
        gradient: 'from-red-100 to-orange-100'
      };
  }
};

export const SlideView: React.FC<SlideViewProps> = ({ slide, theme }) => {
  const styles = getThemeStyles(theme);
  const [quizState, setQuizState] = useState<{ selected?: number; revealed: boolean }>({ revealed: false });
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);

  useEffect(() => {
    // Reset quiz state when slide changes
    setQuizState({ revealed: false });
    
    // Shuffle options for the single quiz question
    if (slide.type === 'quiz' && slide.content.quizList && slide.content.quizList.length > 0) {
      const q = slide.content.quizList[0];
      if (q.options) {
        const indices = q.options.map((_, i) => i);
        // Fisher-Yates shuffle
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        setShuffledOptions(indices);
      }
    }
  }, [slide.id, slide.content.quizList]);

  const handleOptionClick = (originalOptionIdx: number) => {
    if (quizState.revealed) return;
    setQuizState({ selected: originalOptionIdx, revealed: true });
  };

  const handleReveal = () => {
    setQuizState(prev => ({ ...prev, revealed: true }));
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- Title Slide ---
  if (slide.type === 'title') {
    return (
      <div className={`h-full w-full flex flex-col items-center justify-center p-8 text-center ${styles.bg} ${styles.text} relative overflow-hidden`}>
        {/* Ultra Animated Backgrounds */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} animate-gradient-x opacity-30`}></div>
        {theme === 'airbear' && <div className="absolute inset-0 border-[20px] border-green-500/5 pointer-events-none animate-pulse-slow"></div>}
        
        <div className="relative z-10 max-w-4xl animate-float perspective-1000">
          <div className="mb-12 w-full h-80 bg-gray-500/10 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-opacity-30 group relative preserve-3d transition-transform duration-700 hover:rotate-y-12">
             <img 
               src={`https://picsum.photos/1000/500?random=${slide.id}`} 
               alt="Decorative" 
               className="w-full h-full object-cover opacity-80 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-4 left-4 p-2 text-xs opacity-70 bg-black/50 text-white rounded backdrop-blur-sm border border-white/10">
                Prompt: {slide.content.visualPrompt}
             </div>
          </div>
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${styles.fontHead} ${styles.accent} animate-enter-slide-up drop-shadow-2xl`}>
            {slide.content.heading}
          </h1>
          <h2 className={`text-3xl md:text-4xl mb-10 opacity-90 ${styles.fontBody} animate-enter-slide-up`} style={{animationDelay: '0.2s'}}>
            {slide.content.subheading}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {slide.content.text?.map((line, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-current opacity-70 animate-enter-slide-up hover:bg-white/10 transition-colors cursor-default" style={{animationDelay: '0.4s'}}>
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Vocab Slide ---
  if (slide.type === 'vocab') {
    return (
      <div className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text}`}>
        <h2 className={`text-4xl font-bold mb-12 pb-4 border-b ${styles.border} ${styles.fontHead} animate-enter-slide-right`}>
          {slide.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
          {slide.content.vocabList?.map((item, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden p-8 rounded-2xl ${styles.card} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-enter-slide-up group`}
              style={{ animationDelay: `${idx * 150}ms` }}
              onClick={() => speak(item.word)}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                     <h3 className={`text-4xl font-bold ${styles.accent} ${styles.fontHead}`}>{item.word}</h3>
                     <span className="text-2xl cursor-pointer opacity-50 hover:opacity-100 transition-opacity">🔊</span>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${styles.accentBg} ${styles.text} font-bold uppercase tracking-wider`}>{item.pos}</span>
                </div>
                <div className="opacity-60 text-lg mb-4 font-mono">{item.ipa}</div>
                <p className="mb-6 text-xl leading-relaxed font-light">{item.definition}</p>
                {item.translations && (
                  <div className="pt-4 mt-4 border-t border-gray-500/20 text-base opacity-70 flex items-center gap-3">
                    <span className="text-xl">🌍</span> {item.translations}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Single Quiz Slide (Ultra Focused) ---
  if (slide.type === 'quiz') {
    const q = slide.content.quizList?.[0]; // We assume 1 Q per slide now
    if (!q) return null;

    const isRevealed = quizState.revealed;
    const selectedOpt = quizState.selected;
    const isCorrect = selectedOpt === q.correctOption;
    const currentShuffledIndices = shuffledOptions.length ? shuffledOptions : q.options?.map((_, i) => i) || [];

    return (
      <div className={`h-full w-full flex flex-col items-center justify-center p-6 ${styles.bg} ${styles.text}`}>
        <div className="w-full max-w-4xl relative">
          
          {/* Question Number Badge */}
          <div className={`absolute -top-20 left-0 text-9xl font-bold opacity-5 ${styles.fontHead} select-none pointer-events-none`}>
            Q{slide.id}
          </div>

          <div className="relative z-10 animate-enter-slide-right">
             <h2 className={`text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-60 ${styles.accent}`}>{slide.title}</h2>
             <p className={`text-3xl md:text-5xl font-bold leading-tight mb-12 ${styles.fontHead} drop-shadow-lg`}>
               {q.question}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options ? (
               currentShuffledIndices.map((originalIndex, i) => {
                 const opt = q.options![originalIndex];
                 const isThisCorrect = originalIndex === q.correctOption;
                 const isSelected = selectedOpt === originalIndex;
                 
                 let btnClasses = `group relative overflow-hidden p-6 rounded-xl border-2 text-left transition-all duration-500 flex items-center justify-between text-xl `;
                 
                 if (isRevealed) {
                    if (isThisCorrect) {
                      btnClasses += `border-green-500 bg-green-500/20 text-green-400 font-bold scale-105 shadow-lg shadow-green-500/20`;
                    } else if (isSelected && !isThisCorrect) {
                      btnClasses += `border-red-500 bg-red-500/10 text-red-500 opacity-80`;
                    } else {
                      btnClasses += `border-transparent opacity-20 grayscale`;
                    }
                 } else {
                   btnClasses += `border-gray-500/20 bg-gray-500/5 hover:border-${styles.accent.split('-')[1]}-500 hover:bg-white/5 hover:scale-[1.02] active:scale-95`;
                 }

                 return (
                   <button
                     key={originalIndex}
                     onClick={() => handleOptionClick(originalIndex)}
                     disabled={isRevealed}
                     className={`${btnClasses} animate-enter-slide-up`}
                     style={{ animationDelay: `${i * 100 + 300}ms` }}
                   >
                     <span className="relative z-10">{opt}</span>
                     {isRevealed && isThisCorrect && <span className="text-3xl animate-elastic-pop">✨</span>}
                     {isRevealed && isSelected && !isThisCorrect && <span className="text-3xl animate-elastic-pop">❌</span>}
                   </button>
                 );
               })
            ) : (
               <div className="col-span-2 flex flex-col items-center gap-6 mt-8 animate-enter-slide-up">
                  {!isRevealed ? (
                    <button 
                      onClick={handleReveal}
                      className={`px-12 py-4 rounded-full text-xl font-bold ${styles.accentBg} ${styles.accent} hover:brightness-110 hover:scale-105 transition-all shadow-lg`}
                    >
                      Show Answer
                    </button>
                  ) : (
                    <div className="text-4xl font-bold text-green-400 animate-elastic-pop p-8 border-2 border-green-500 rounded-2xl bg-green-500/10">
                      {q.answer}
                    </div>
                  )}
               </div>
            )}
          </div>
          
          {/* Feedback */}
          {isRevealed && q.options && (
            <div className={`mt-12 text-center text-2xl font-bold animate-elastic-pop ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? "Correct! Amazing work." : `Not quite. The answer is ${q.options[q.correctOption!]}.`}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Ultra Animated Timeline (Process/Grammar) ---
  const isProcessSlide = slide.type === 'grammar' || slide.title.includes('Process') || slide.title.includes('Timeline');

  if (isProcessSlide) {
     return (
        <div className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text} flex flex-col`}>
          <h2 className={`text-4xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead} animate-enter-slide-right`}>
            {slide.title}
          </h2>
          
          <div className={`flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative pl-10 md:pl-20 py-20`}>
             
             {/* SVG Drawing Line */}
             <svg className="absolute left-[58px] md:left-[98px] top-0 bottom-0 h-full w-10 overflow-visible pointer-events-none">
               <line 
                 x1="2" y1="0" x2="2" y2="100%" 
                 stroke="currentColor" 
                 strokeWidth="4" 
                 className={`${styles.accent} opacity-30`}
               />
               <path 
                 d={`M 2 0 V ${slide.content.text ? slide.content.text.length * 150 + 200 : 800}`} 
                 stroke="currentColor" 
                 strokeWidth="4" 
                 fill="none" 
                 className={`${styles.accent} animate-draw-line`}
               />
             </svg>

             {slide.content.heading && (
               <h3 className={`text-3xl font-bold mb-16 ${styles.accent} animate-enter-slide-up`}>{slide.content.heading}</h3>
             )}
             
             <div className="space-y-16">
              {slide.content.text?.map((paragraph, idx) => (
                <div 
                   key={idx} 
                   className={`relative group perspective-1000`}
                >
                   {/* Pulsing Node */}
                   <div 
                      className={`absolute -left-[54px] md:-left-[94px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${styles.bg} border-4 ${styles.border} z-20 shadow-[0_0_20px_currentColor] ${styles.accent} animate-elastic-pop flex items-center justify-center`}
                      style={{ animationDelay: `${idx * 400}ms` }}
                   >
                     <div className={`w-3 h-3 rounded-full bg-current animate-ping`}></div>
                   </div>
                   
                   {/* Connector Line (Horizontal) */}
                   <div 
                      className={`absolute -left-[40px] md:-left-[80px] top-1/2 w-10 md:w-20 h-1 ${styles.accentBg} origin-left animate-draw-line`}
                      style={{ animationDelay: `${idx * 400 + 200}ms` }}
                   ></div>

                   <div 
                      className={`p-8 rounded-2xl ${styles.card} relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:rotate-1 opacity-0 animate-enter-slide-right`}
                      style={{ animationDelay: `${idx * 400 + 300}ms` }}
                   >
                       <div className={`absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                       
                       <div className="relative z-10 flex items-center gap-6">
                          <span className={`text-6xl font-bold opacity-10 ${styles.fontHead} absolute -right-4 -bottom-8 group-hover:scale-150 transition-transform duration-700`}>{idx + 1}</span>
                          <p className="text-xl md:text-2xl leading-relaxed font-light">{paragraph}</p>
                       </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
     );
  }

  // --- Content Slide (Default) ---
  return (
    <div className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text} flex flex-col`}>
      <h2 className={`text-3xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead} animate-enter-slide-right`}>
        {slide.title}
      </h2>
      
      <div className={`flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full`}>
        {slide.content.heading && (
          <h3 className={`text-2xl font-bold mb-6 ${styles.accent}`}>{slide.content.heading}</h3>
        )}
        
        <div className="space-y-6">
          {slide.content.text?.map((paragraph, idx) => (
            <div key={idx} className={`p-6 rounded-xl ${styles.card} flex gap-4 items-start animate-enter-slide-up`} style={{animationDelay: `${idx * 100}ms`}}>
               <div className="mt-1">
                 {theme === 'economy' && idx === 0 && <span className="text-4xl animate-bounce">⚖️</span>}
                 {theme === 'airbear' && idx === 0 && <span className="text-4xl animate-spin-slow">⚙️</span>}
               </div>
               <div>
                  <p className="text-lg md:text-xl leading-relaxed">{paragraph}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};