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
        card: 'bg-slate-800/80 backdrop-blur-md border border-slate-700',
        fontHead: 'font-sans',
        fontBody: 'font-sans'
      };
    case 'airbear':
      return {
        bg: 'bg-black',
        text: 'text-green-50',
        accent: 'text-green-400',
        accentBg: 'bg-green-900/20',
        border: 'border-green-500',
        card: 'bg-gray-900 border border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.1)]',
        fontHead: 'font-mono tracking-tighter',
        fontBody: 'font-mono'
      };
    case 'economy':
      return {
        bg: 'bg-stone-50',
        text: 'text-stone-800',
        accent: 'text-red-700',
        accentBg: 'bg-stone-200',
        border: 'border-stone-300',
        card: 'bg-white shadow-lg border-t-4 border-red-700',
        fontHead: 'font-serif',
        fontBody: 'font-sans'
      };
  }
};

export const SlideView: React.FC<SlideViewProps> = ({ slide, theme }) => {
  const styles = getThemeStyles(theme);
  const [quizState, setQuizState] = useState<Record<number, { selected?: number; revealed: boolean }>>({});
  const [shuffledOptions, setShuffledOptions] = useState<Record<number, number[]>>({});

  useEffect(() => {
    // Reset quiz state when slide changes
    setQuizState({});
    
    // Generate shuffled indices for each question to randomize options
    if (slide.type === 'quiz' && slide.content.quizList) {
      const newShuffled: Record<number, number[]> = {};
      slide.content.quizList.forEach((q, qIdx) => {
        if (q.options) {
           const indices = q.options.map((_, i) => i);
           // Shuffle indices
           for (let i = indices.length - 1; i > 0; i--) {
             const j = Math.floor(Math.random() * (i + 1));
             [indices[i], indices[j]] = [indices[j], indices[i]];
           }
           newShuffled[qIdx] = indices;
        }
      });
      setShuffledOptions(newShuffled);
    }
  }, [slide.id, slide.content.quizList]);

  const handleOptionClick = (questionIdx: number, originalOptionIdx: number) => {
    if (quizState[questionIdx]?.revealed) return;
    setQuizState(prev => ({
      ...prev,
      [questionIdx]: { selected: originalOptionIdx, revealed: true }
    }));
  };

  const handleReveal = (questionIdx: number) => {
    setQuizState(prev => ({
      ...prev,
      [questionIdx]: { ...prev[questionIdx], revealed: true }
    }));
  };

  // --- Title Slide ---
  if (slide.type === 'title') {
    return (
      <div className={`h-full w-full flex flex-col items-center justify-center p-8 text-center ${styles.bg} ${styles.text} relative overflow-hidden`}>
        {/* Background Decorative Elements */}
        {theme === 'microbiome' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>}
        {theme === 'airbear' && <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>}
        
        <div className="relative z-10 max-w-4xl">
          <div className="mb-8 w-full h-64 bg-gray-500/10 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-opacity-30">
             <img 
               src={`https://picsum.photos/800/400?random=${slide.id}`} 
               alt="Decorative" 
               className="w-full h-full object-cover opacity-80 mix-blend-overlay"
             />
             <div className="absolute p-4 text-xs opacity-50 bg-black/50 text-white rounded">
                Visual: {slide.content.visualPrompt}
             </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${styles.fontHead} ${styles.accent}`}>
            {slide.content.heading}
          </h1>
          <h2 className={`text-2xl md:text-3xl mb-8 opacity-90 ${styles.fontBody}`}>
            {slide.content.subheading}
          </h2>
          {slide.content.text?.map((line, i) => (
            <p key={i} className="text-lg uppercase tracking-widest opacity-70">{line}</p>
          ))}
        </div>
      </div>
    );
  }

  // --- Vocab Slide ---
  if (slide.type === 'vocab') {
    return (
      <div className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text}`}>
        <h2 className={`text-3xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead}`}>
          {slide.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slide.content.vocabList?.map((item, idx) => (
            <div key={idx} className={`p-6 rounded-xl ${styles.card} transition-all hover:-translate-y-1`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-2xl font-bold ${styles.accent} ${styles.fontHead}`}>{item.word}</h3>
                <span className={`text-xs px-2 py-1 rounded ${styles.accentBg} ${styles.text} opacity-80`}>{item.pos}</span>
              </div>
              <div className="opacity-60 text-sm mb-3 font-mono">{item.ipa}</div>
              <p className="mb-4 text-lg leading-relaxed">{item.definition}</p>
              {item.translations && (
                <div className="pt-3 mt-3 border-t border-gray-500/20 text-sm opacity-70">
                  {item.translations}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Quiz Slide ---
  if (slide.type === 'quiz') {
    return (
      <div className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text}`}>
        <h2 className={`text-3xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead}`}>
          {slide.title}
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
          {slide.content.quizList?.map((q, idx) => {
            const isRevealed = quizState[idx]?.revealed;
            const selectedOpt = quizState[idx]?.selected;
            const isCorrect = selectedOpt === q.correctOption;
            const currentShuffledIndices = shuffledOptions[idx] || q.options?.map((_, i) => i) || [];

            return (
              <div key={idx} className={`p-6 rounded-xl ${styles.card}`}>
                <div className="flex gap-4">
                  <span className={`font-bold text-xl ${styles.accent} opacity-50`}>{idx + 1}.</span>
                  <div className="flex-1 w-full">
                    <p className="text-xl mb-6 font-medium leading-relaxed">{q.question}</p>
                    
                    {q.options ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentShuffledIndices.map((originalIndex) => {
                          const opt = q.options![originalIndex];
                          const isThisCorrect = originalIndex === q.correctOption;
                          const isSelected = selectedOpt === originalIndex;
                          
                          let btnStyle = `p-4 rounded-lg border-2 text-left transition-all duration-200 relative overflow-hidden `;
                          
                          if (isRevealed) {
                             if (isThisCorrect) {
                               // Green for correct option
                               btnStyle += `border-green-500 bg-green-500/10 text-green-500 font-bold`;
                             } else if (isSelected && !isThisCorrect) {
                               // Red for selected wrong option
                               btnStyle += `border-red-500 bg-red-500/10 text-red-500`;
                             } else {
                               // Dim others
                               btnStyle += `border-transparent opacity-30`;
                             }
                          } else {
                            // Default interactive state
                            btnStyle += `border-gray-500/30 hover:border-gray-400 hover:bg-white/5 active:scale-[0.99]`;
                          }

                          return (
                            <button
                              key={originalIndex}
                              onClick={() => handleOptionClick(idx, originalIndex)}
                              disabled={isRevealed}
                              className={btnStyle}
                            >
                              <div className="flex justify-between items-center">
                                <span>{opt}</span>
                                {isRevealed && isThisCorrect && <span className="text-xl">✓</span>}
                                {isRevealed && isSelected && !isThisCorrect && <span className="text-xl">✕</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      // Fallback for non-multiple choice
                      <div className="mt-4">
                        {!isRevealed ? (
                          <button
                            onClick={() => handleReveal(idx)}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${styles.accentBg} ${styles.accent} hover:opacity-80`}
                          >
                            Reveal Answer
                          </button>
                        ) : (
                          <div className={`p-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 animate-in fade-in slide-in-from-top-2`}>
                            <span className="font-bold mr-2">Answer:</span>
                            {q.answer}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Feedback Message */}
                    {isRevealed && q.options && (
                      <div className={`mt-4 text-sm font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'} animate-pulse`}>
                        {isCorrect ? "Correct! Well done." : `Incorrect. The correct answer is ${q.options[q.correctOption!]}.`}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Default / Grammar Slide ---
  return (
    <div className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text} flex flex-col`}>
      <h2 className={`text-3xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead}`}>
        {slide.title}
      </h2>
      
      <div className={`flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full`}>
        {slide.content.heading && (
          <h3 className={`text-2xl font-bold mb-6 ${styles.accent}`}>{slide.content.heading}</h3>
        )}
        
        <div className="space-y-6">
          {slide.content.text?.map((paragraph, idx) => (
            <div key={idx} className={`p-6 rounded-xl ${styles.card} flex gap-4 items-start`}>
               {theme === 'economy' && idx === 0 && <span className="text-4xl">⚖️</span>}
               {theme === 'airbear' && idx === 0 && <span className="text-4xl">⚙️</span>}
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