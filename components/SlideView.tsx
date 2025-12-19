import React, { useState, useEffect, useRef } from 'react';
import { Slide, ThemeType, VocabItem } from '../types';

interface SlideViewProps {
  slide: Slide;
  theme: ThemeType;
  onScore?: (points: number) => void;
}

// --- Audio Engine (Polished) ---
class AudioSynth {
  ctx: AudioContext | null = null;
  bgOscillators: OscillatorNode[] = [];
  gainNode: GainNode | null = null;
  isPlayingBg: boolean = false;
  bgInterval: number | null = null;

  constructor() {
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.error(e));
    }
  }

  playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, vol: number = 0.1) {
    if (!this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playCorrect() {
    this.playTone(600, 'sine', 0.1, 0.2); 
    setTimeout(() => this.playTone(900, 'sine', 0.2, 0.2), 100); 
  }

  playWrong() {
    this.playTone(200, 'sawtooth', 0.3, 0.2);
  }

  playFlip() {
    this.playTone(400, 'triangle', 0.05, 0.05);
  }

  startBgMusic(theme: ThemeType) {
    // Placeholder for background music logic if desired.
    // Kept simple to avoid browser autoplay restrictions annoyance.
  }
  
  stopBgMusic() {
    // Cleanup
  }
}

// --- Visual Helpers ---

const getThemeAssets = (theme: ThemeType) => {
  switch (theme) {
    case 'microbiome':
      return {
        bgClass: 'bg-radial-gradient from-slate-900 to-black',
        accentColor: '#22d3ee', // Cyan
        font: 'font-sans',
        cardBg: 'bg-slate-800/60 border-slate-600',
        particleColor: 'rgba(34, 211, 238, 0.4)'
      };
    case 'airbear':
      return {
        bgClass: 'bg-black',
        accentColor: '#4ade80', // Green
        font: 'font-mono',
        cardBg: 'bg-green-950/40 border-green-800',
        particleColor: 'rgba(74, 222, 128, 0.5)'
      };
    case 'economy':
      return {
        bgClass: 'bg-[#fdfbf7]', // Cream
        accentColor: '#dc2626', // Red
        font: 'font-serif',
        cardBg: 'bg-white border-stone-200 shadow-xl',
        particleColor: 'rgba(220, 38, 38, 0.2)'
      };
  }
};

// --- Sub-Components ---

const VocabCard: React.FC<{ item: VocabItem; theme: ThemeType; onFlip: () => void }> = ({ item, theme, onFlip }) => {
  const [flipped, setFlipped] = useState(false);
  const styles = getThemeAssets(theme);

  const handleFlip = () => {
    setFlipped(!flipped);
    onFlip();
  };

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(item.word);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div 
      className="group perspective-1000 h-64 w-full cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative h-full w-full transition-transform duration-500 transform preserve-3d ${flipped ? 'rotate-y-180' : ''} shadow-2xl rounded-2xl`}>
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden rounded-2xl p-6 flex flex-col items-center justify-center text-center border ${styles.cardBg} ${theme === 'economy' ? 'text-stone-800' : 'text-white'}`}>
           <div className={`text-xs uppercase font-bold tracking-widest opacity-60 mb-2`}>{item.pos}</div>
           <h3 className={`text-4xl font-bold mb-4 ${styles.font}`}>{item.word}</h3>
           <div className="opacity-50 font-mono text-sm">{item.ipa}</div>
           <button 
             onClick={speak}
             className="mt-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
           >
             🔊
           </button>
           <div className="absolute bottom-4 text-xs opacity-40 animate-pulse">Click to flip</div>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 flex flex-col items-center justify-center text-center border ${styles.cardBg} ${theme === 'economy' ? 'bg-stone-100 text-stone-900' : 'bg-slate-900 text-white'}`}>
           <p className="text-lg leading-relaxed font-medium mb-4">{item.definition}</p>
           {item.translations && (
             <div className="pt-4 border-t border-current/10 text-sm opacity-80">
               {item.translations}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const QuizOption: React.FC<{ 
  option: string; 
  idx: number; 
  selected: boolean; 
  correct: boolean; 
  revealed: boolean; 
  onClick: () => void;
  theme: ThemeType;
}> = ({ option, idx, selected, correct, revealed, onClick, theme }) => {
  const assets = getThemeAssets(theme);
  
  let bgClass = '';
  if (revealed) {
    if (correct) bgClass = 'bg-green-600 border-green-800 text-white';
    else if (selected && !correct) bgClass = 'bg-red-600 border-red-800 text-white';
    else bgClass = 'bg-gray-700/50 border-gray-700 opacity-50 grayscale'; // Dim others
  } else {
    // Kahoot-ish colors or Theme colors
    const colors = ['bg-kRed', 'bg-kBlue', 'bg-kYellow', 'bg-kGreen'];
    bgClass = `${colors[idx % 4]} hover:brightness-110 border-b-4 border-black/20 text-white`;
  }

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      className={`w-full p-6 rounded-xl text-left shadow-lg transform transition-all duration-200 active:scale-95 ${bgClass} flex items-center gap-4 group overflow-hidden relative`}
    >
      <div className="flex-none w-8 h-8 rounded-full bg-black/20 flex items-center justify-center font-bold">
        {['▲', '◆', '●', '■'][idx % 4]}
      </div>
      <span className="text-lg md:text-xl font-bold relative z-10">{option}</span>
      {!revealed && <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />}
    </button>
  );
};

// --- Main Component ---

export const SlideView: React.FC<SlideViewProps> = ({ slide, theme, onScore }) => {
  const assets = getThemeAssets(theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const synth = useRef<AudioSynth>(new AudioSynth());
  
  // Quiz State
  const [quizState, setQuizState] = useState<{ selected?: number; revealed: boolean; correct?: boolean }>({ revealed: false });
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  
  // Reset interactions on slide change
  useEffect(() => {
    setQuizState({ revealed: false });
    if (slide.type === 'quiz' && slide.content.quizList?.[0]) {
      const q = slide.content.quizList[0];
      const indices = q.options?.map((_, i) => i) || [];
      // Shuffle indices
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledOptions(indices);
    }
  }, [slide.id]);

  // --- Visual Engine (Canvas) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: any[] = [];
    let time = 0;

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = theme === 'microbiome' ? 15 : theme === 'airbear' ? 40 : 10;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * (theme === 'microbiome' ? 60 : 3) + 2,
          vx: (Math.random() - 0.5) * (theme === 'airbear' ? 4 : 0.5),
          vy: (Math.random() - 0.5) * (theme === 'airbear' ? 4 : 0.5),
          alpha: Math.random() * 0.5,
          text: theme === 'economy' ? (Math.random() > 0.5 ? '%' : '$') : ''
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      if (theme === 'microbiome') {
        // Organic Blobs (Metaball-ish look via blur)
        // Note: Real metaballs are expensive, we use soft circles and composition
        ctx.globalCompositeOperation = 'screen';
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          // Wrap
          if(p.x < -100) p.x = canvas.width + 100;
          if(p.x > canvas.width + 100) p.x = -100;
          if(p.y < -100) p.y = canvas.height + 100;
          if(p.y > canvas.height + 100) p.y = -100;

          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (1 + Math.sin(time + p.x)*0.2));
          gradient.addColorStop(0, `rgba(34, 211, 238, ${p.alpha})`);
          gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over';
      } 
      else if (theme === 'airbear') {
        // 3D Grid floor effect
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.15)';
        ctx.lineWidth = 1;
        
        // Moving horizontal lines
        const horizon = canvas.height * 0.3;
        const gridSpeed = (time * 50) % 50;
        
        ctx.beginPath();
        // Perspective lines radiating from center
        for(let i = -canvas.width; i < canvas.width * 2; i+=100) {
            ctx.moveTo(canvas.width/2, horizon);
            ctx.lineTo(i, canvas.height);
        }
        // Horizontal scan lines
        for(let i = horizon; i < canvas.height; i+=40) {
           let y = i + gridSpeed;
           if(y > canvas.height) y -= (canvas.height - horizon);
           ctx.moveTo(0, y);
           ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();

        // Data Rain
        ctx.fillStyle = assets.particleColor;
        particles.forEach(p => {
            p.y += p.vy * 4;
            if(p.y > canvas.height) p.y = 0;
            ctx.fillRect(p.x, p.y, 2, 15 + Math.random()*10);
        });
      }
      else if (theme === 'economy') {
         // Clean floating charts/tickers
         particles.forEach(p => {
             p.x += p.vx * 0.5;
             p.y += Math.sin(time + p.x) * 0.5;
             if(p.x > canvas.width) p.x = -20;
             
             ctx.font = `${p.r * 4}px Playfair Display`;
             ctx.fillStyle = theme === 'economy' ? 'rgba(0,0,0,0.05)' : 'white';
             ctx.fillText(p.text, p.x, p.y);
         });
         
         // Subtle graph line
         ctx.beginPath();
         ctx.strokeStyle = 'rgba(220, 38, 38, 0.1)';
         ctx.lineWidth = 2;
         ctx.moveTo(0, canvas.height * 0.8);
         for(let i=0; i<canvas.width; i+=10) {
             ctx.lineTo(i, canvas.height * 0.8 - Math.sin(i * 0.01 + time) * 50 - (i/canvas.width)*100);
         }
         ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);


  // --- Logic ---

  const handleQuizAnswer = (selectedIdx: number) => {
    if (quizState.revealed) return;
    const q = slide.content.quizList?.[0];
    if (!q) return;

    const correct = selectedIdx === q.correctOption;
    setQuizState({ revealed: true, selected: selectedIdx, correct });

    if (correct) {
      synth.current.playCorrect();
      if (onScore) onScore(100); // 100 XP
    } else {
      synth.current.playWrong();
    }
  };

  // --- Renderers ---

  const renderTitle = () => (
    <div className="flex flex-col items-center justify-center h-full text-center relative z-10 px-6">
       <div className={`mb-8 p-1 border border-white/10 rounded-full inline-block animate-float`}>
          <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${theme === 'economy' ? 'bg-stone-200 text-stone-600' : 'bg-white/10 text-white'}`}>
             Mission: {theme}
          </div>
       </div>
       <h1 className={`text-4xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl ${assets.font} animate-enter-slide-up`}>
         {slide.content.heading}
       </h1>
       <p className={`text-xl md:text-3xl opacity-80 max-w-2xl mx-auto ${theme === 'airbear' ? 'font-mono' : 'font-sans'} animate-enter-slide-up`} style={{ animationDelay: '0.2s' }}>
         {slide.content.subheading}
       </p>
       <div className="mt-12 opacity-60 text-sm animate-pulse-slow">
         Press SPACE to Begin
       </div>
    </div>
  );

  const renderVocab = () => (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-12 z-10 relative">
       <h2 className={`text-3xl font-bold mb-8 border-b border-current/20 pb-4 inline-block ${assets.font} animate-enter-slide-right`}>{slide.title}</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {slide.content.vocabList?.map((item, idx) => (
             <div key={idx} className="animate-enter-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <VocabCard 
                  item={item} 
                  theme={theme} 
                  onFlip={() => synth.current.playFlip()} 
                />
             </div>
          ))}
       </div>
    </div>
  );

  const renderQuiz = () => {
    const q = slide.content.quizList?.[0];
    if (!q) return null;
    const options = shuffledOptions.length ? shuffledOptions : q.options?.map((_,i)=>i) || [];

    return (
      <div className="h-full flex flex-col justify-center items-center p-6 z-10 relative max-w-5xl mx-auto w-full">
         <div className={`w-full bg-white text-black p-8 rounded-2xl shadow-2xl mb-8 text-center animate-enter-slide-up border-b-8 ${theme === 'economy' ? 'border-red-600' : 'border-blue-600'}`}>
            <h2 className="text-2xl md:text-4xl font-bold">{q.question}</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {options.map((origIdx, i) => (
              <div key={origIdx} className="animate-enter-slide-up" style={{ animationDelay: `${i * 100 + 200}ms` }}>
                <QuizOption 
                  option={q.options![origIdx]} 
                  idx={i}
                  selected={quizState.selected === origIdx}
                  correct={origIdx === q.correctOption}
                  revealed={quizState.revealed}
                  onClick={() => handleQuizAnswer(origIdx)}
                  theme={theme}
                />
              </div>
            ))}
         </div>
         
         {quizState.revealed && (
           <div className={`mt-8 px-6 py-3 rounded-full font-bold text-xl animate-elastic-pop flex items-center gap-3 ${quizState.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {quizState.correct ? '🎉 Correct! +100 XP' : '❌ Try again next time'}
           </div>
         )}
      </div>
    );
  };

  const renderContent = () => (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 md:p-12 z-10 relative flex flex-col justify-center max-w-4xl mx-auto">
       <h2 className={`text-4xl md:text-5xl font-bold mb-12 ${assets.font} animate-enter-slide-right`}>{slide.title}</h2>
       
       <div className="space-y-8">
         {slide.content.text?.map((para, idx) => (
           <div key={idx} className={`flex gap-6 animate-enter-slide-up`} style={{ animationDelay: `${idx * 200}ms` }}>
             {/* Decorator Line */}
             <div className="flex-none flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 ${theme === 'economy' ? 'border-red-500 bg-white' : 'border-current bg-transparent'}`}></div>
                {idx !== (slide.content.text!.length - 1) && <div className="w-0.5 flex-1 bg-current/20 my-2"></div>}
             </div>
             
             <div className={`p-6 rounded-2xl flex-1 ${assets.cardBg} backdrop-blur-sm transition-transform hover:translate-x-2 duration-300`}>
                <p className={`text-lg md:text-xl leading-loose ${theme === 'airbear' ? 'font-mono' : ''}`}>
                  {para}
                </p>
             </div>
           </div>
         ))}
       </div>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className={`h-full w-full relative overflow-hidden flex flex-col ${assets.bgClass} ${theme === 'economy' ? 'text-stone-800' : 'text-gray-100'}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />
      
      {/* Content Switcher */}
      {slide.type === 'title' && renderTitle()}
      {slide.type === 'vocab' && renderVocab()}
      {slide.type === 'quiz' && renderQuiz()}
      {(slide.type === 'content' || slide.type === 'grammar') && renderContent()}

    </div>
  );
};