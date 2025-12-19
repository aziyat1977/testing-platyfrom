import React from 'react';
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
        <div className="space-y-4 max-w-3xl mx-auto">
          {slide.content.quizList?.map((q, idx) => (
            <div key={idx} className={`p-6 rounded-lg ${styles.card}`}>
              <div className="flex gap-4">
                <span className={`font-bold text-xl ${styles.accent}`}>{idx + 1}.</span>
                <div className="flex-1">
                  <p className="text-xl mb-4">{q.question}</p>
                  <div className={`p-4 rounded ${styles.accentBg} font-medium`}>
                    Answer: <span className={styles.accent}>{q.answer}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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