import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slide, ThemeType } from '../types';

interface SlideViewProps {
  slide: Slide;
  theme: ThemeType;
}

// --- Enhanced Audio Engine (Kahoot Style) ---
class AudioSynth {
  ctx: AudioContext | null = null;
  bgOscillators: OscillatorNode[] = [];
  bgGains: GainNode[] = [];
  isPlayingBg: boolean = false;
  bgInterval: number | null = null;

  constructor() {
    if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Play a funky bassline loop
  startThinkingMusic() {
    if (!this.ctx || this.isPlayingBg) return;
    this.isPlayingBg = true;
    
    let step = 0;
    // Simple bass groove: E2, E2, G2, E2, A2, G2...
    const notes = [82.41, 82.41, 98.00, 82.41, 110.00, 98.00, 82.41, 0]; 
    const tempo = 500; // ms

    const playNote = () => {
      if (!this.ctx || !this.isPlayingBg) return;
      
      const freq = notes[step % notes.length];
      if (freq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square'; // Arcade/Funky sound
        osc.frequency.value = freq;
        
        // Filter to make it sound muffled/bass-like
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        osc.stop(this.ctx.currentTime + 0.3);
      }
      step++;
    };

    playNote(); // Start immediately
    this.bgInterval = window.setInterval(playNote, tempo);
  }

  stopThinkingMusic() {
    this.isPlayingBg = false;
    if (this.bgInterval) {
      clearInterval(this.bgInterval);
      this.bgInterval = null;
    }
  }

  playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1, vol: number = 0.1) {
    if (!this.ctx) return;
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
    this.stopThinkingMusic();
    // Happy Arpeggio
    const now = this.ctx?.currentTime || 0;
    this.playTone(523.25, 'sine', 0.1, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.1, 0.2), 100); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.2), 200); // G5
    setTimeout(() => this.playTone(1046.50, 'square', 0.4, 0.1), 300); // C6
  }

  playWrong() {
    this.stopThinkingMusic();
    // Sad wobble
    this.playTone(150, 'sawtooth', 0.4, 0.2);
    setTimeout(() => this.playTone(140, 'sawtooth', 0.4, 0.2), 100);
  }

  playTick() {
    this.playTone(800, 'triangle', 0.05, 0.05);
  }
}

// --- Theme Style Helper ---
const getThemeStyles = (theme: ThemeType) => {
  switch (theme) {
    case 'microbiome':
      return {
        bg: 'bg-slate-900',
        text: 'text-gray-100',
        accent: 'text-cyan-400',
        accentBg: 'bg-cyan-900/30',
        border: 'border-cyan-500/30',
        card: 'bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-[0_0_20px_rgba(34,211,238,0.2)]',
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
        card: 'bg-gray-900 border border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.3)]',
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
        card: 'bg-white shadow-2xl border-t-4 border-red-700',
        fontHead: 'font-serif',
        fontBody: 'font-sans',
        gradient: 'from-red-100 to-orange-100'
      };
  }
};

// Kahoot Shapes
const Shapes = {
  Triangle: () => <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 fill-white"><path d="M12 2L22 22H2L12 2Z" /></svg>,
  Diamond: () => <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 fill-white"><path d="M12 2L22 12L12 22L2 12L12 2Z" /></svg>,
  Circle: () => <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 fill-white"><circle cx="12" cy="12" r="10" /></svg>,
  Square: () => <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 fill-white"><rect x="2" y="2" width="20" height="20" /></svg>,
};

export const SlideView: React.FC<SlideViewProps> = ({ slide, theme }) => {
  const styles = getThemeStyles(theme);
  const [quizState, setQuizState] = useState<{ selected?: number; revealed: boolean }>({ revealed: false });
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<AudioSynth | null>(null);
  
  // Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Init Audio
  useEffect(() => {
    synthRef.current = new AudioSynth();
    return () => synthRef.current?.stopThinkingMusic();
  }, []);

  // Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Procedural Canvas Particle Engine ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    // Resize
    const resize = () => {
      // Use parent container dimensions instead of window to avoid overflow issues
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Init Particles based on Theme
    const initParticles = () => {
      particles = [];
      const count = theme === 'microbiome' ? 40 : theme === 'airbear' ? 60 : 25;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (theme === 'airbear' ? 3 : 0.8),
          vy: (Math.random() - 0.5) * (theme === 'airbear' ? 3 : 0.8),
          size: Math.random() * (theme === 'economy' ? 30 : 4) + 2,
          color: theme === 'microbiome' 
            ? `rgba(34, 211, 238, ${Math.random() * 0.5})` 
            : theme === 'airbear' 
            ? `rgba(74, 222, 128, ${Math.random() * 0.8})` 
            : `rgba(185, 28, 28, ${Math.random() * 0.2})`,
          pulse: Math.random() * Math.PI
        });
      }
    };
    initParticles();

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (theme === 'microbiome') {
        // Floating Organisms
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.05;
          
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          const pulseSize = p.size + Math.sin(p.pulse) * 2;
          ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      } 
      else if (theme === 'airbear') {
        // Digital Grid
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
        ctx.beginPath();
        for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i, canvas.height); }
        ctx.stroke();
        particles.forEach(p => {
            p.y += p.vy * 5;
            if (p.y > canvas.height) p.y = 0;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 2, 15);
        });
      } 
      else if (theme === 'economy') {
         // Floating Tickers
         particles.forEach(p => {
             p.x += p.vx;
             if (p.x > canvas.width) p.x = -50;
             ctx.font = `${p.size}px serif`;
             ctx.fillStyle = p.color;
             ctx.fillText(Math.random() > 0.5 ? '$' : '%', p.x, p.y);
         });
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // Quiz Logic (Kahoot Style)
  useEffect(() => {
    // Reset state on slide change
    setQuizState({ revealed: false });
    setTimeLeft(20);
    setScore(0);
    synthRef.current?.stopThinkingMusic();

    if (slide.type === 'quiz' && slide.content.quizList && slide.content.quizList.length > 0) {
      synthRef.current?.startThinkingMusic();
      const q = slide.content.quizList[0];
      if (q.options) {
        const indices = q.options.map((_, i) => i);
        // Shuffle
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        setShuffledOptions(indices);
      }

      // Timer Logic
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizState({ revealed: true }); // Time up
            synthRef.current?.stopThinkingMusic();
            synthRef.current?.playWrong();
            return 0;
          }
          if (prev <= 6) synthRef.current?.playTick(); // Tick tock sound at end
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [slide.id, slide.content.quizList]);

  // --- Handlers ---
  const handleOptionClick = (originalOptionIdx: number) => {
    if (quizState.revealed) return;
    
    // Calculate Score based on Time Left
    const points = Math.round(1000 * (timeLeft / 20));
    setScore(points);
    
    setQuizState({ selected: originalOptionIdx, revealed: true });
    
    const q = slide.content.quizList?.[0];
    if (q && originalOptionIdx === q.correctOption) {
      synthRef.current?.playCorrect();
    } else {
      synthRef.current?.playWrong();
    }
  };

  const handleHover = () => {
    if (!quizState.revealed) synthRef.current?.playHover();
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

  // --- Render Components ---

  // Title Slide
  if (slide.type === 'title') {
    return (
      <div ref={containerRef} className={`h-full w-full flex flex-col items-center justify-center p-6 text-center ${styles.bg} ${styles.text} relative overflow-hidden perspective-1000`}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} animate-gradient-x opacity-30`}></div>
        
        <div 
           className="relative z-10 w-full max-w-4xl preserve-3d transition-transform duration-100 flex flex-col items-center justify-center h-full"
           style={{ transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` }}
        >
          <div className="mb-4 md:mb-12 w-full max-w-md md:max-w-2xl h-48 md:h-80 bg-gray-500/10 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-opacity-30 group relative preserve-3d shadow-2xl shrink-0">
             <img 
               src={`https://picsum.photos/1000/500?random=${slide.id}`} 
               alt="Decorative" 
               className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-4 left-4 p-2 text-[10px] md:text-xs opacity-70 bg-black/50 text-white rounded backdrop-blur-sm border border-white/10 animate-pulse">
                AI Visual: {slide.content.visualPrompt}
             </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 ${styles.fontHead} ${styles.accent} animate-enter-slide-up drop-shadow-2xl tracking-tight`}>
            {slide.content.heading}
          </h1>
          <h2 className={`text-lg sm:text-xl md:text-3xl md:text-4xl mb-6 opacity-90 ${styles.fontBody} animate-enter-slide-up`} style={{animationDelay: '0.2s'}}>
            {slide.content.subheading}
          </h2>
        </div>
      </div>
    );
  }

  // Vocab Slide
  if (slide.type === 'vocab') {
    return (
      <div ref={containerRef} className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text} relative`}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 fixed" />
        <h2 className={`text-3xl md:text-5xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead} animate-enter-slide-right relative z-10`}>
          {slide.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-32 relative z-10 perspective-1000">
          {slide.content.vocabList?.map((item, idx) => (
            <div 
              key={idx} 
              onMouseEnter={handleHover}
              className={`relative overflow-hidden p-6 md:p-8 rounded-2xl ${styles.card} transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl opacity-0 animate-enter-slide-up group cursor-pointer preserve-3d`}
              style={{ animationDelay: `${idx * 150}ms` }}
              onClick={() => speak(item.word)}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                     <h3 className={`text-2xl md:text-4xl font-bold ${styles.accent} ${styles.fontHead}`}>{item.word}</h3>
                     <span className="text-xl md:text-2xl opacity-50 hover:opacity-100 hover:scale-125 transition-all">🔊</span>
                  </div>
                  <span className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full ${styles.accentBg} ${styles.text} font-bold uppercase tracking-wider`}>{item.pos}</span>
                </div>
                <div className="opacity-60 text-base md:text-lg mb-4 font-mono">{item.ipa}</div>
                <p className="mb-4 md:mb-6 text-lg md:text-xl leading-relaxed font-light">{item.definition}</p>
                {item.translations && (
                  <div className="pt-4 mt-4 border-t border-gray-500/20 text-sm md:text-base opacity-70 flex items-center gap-3">
                    <span className="text-xl animate-bounce">🌍</span> {item.translations}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- KAHOOT STYLE QUIZ SLIDE (RESPONSIVE) ---
  if (slide.type === 'quiz') {
    const q = slide.content.quizList?.[0];
    if (!q) return null;

    const isRevealed = quizState.revealed;
    const selectedOpt = quizState.selected;
    const isCorrect = selectedOpt === q.correctOption;
    const currentShuffledIndices = shuffledOptions.length ? shuffledOptions : q.options?.map((_, i) => i) || [];
    
    // Kahoot Colors
    const kahootColors = [
      { bg: 'bg-kRed', border: 'border-b-[6px] border-red-800', icon: Shapes.Triangle },
      { bg: 'bg-kBlue', border: 'border-b-[6px] border-blue-800', icon: Shapes.Diamond },
      { bg: 'bg-kYellow', border: 'border-b-[6px] border-yellow-700', icon: Shapes.Circle },
      { bg: 'bg-kGreen', border: 'border-b-[6px] border-green-800', icon: Shapes.Square },
    ];

    return (
      <div className="h-full w-full flex flex-col bg-purple-900 text-white font-sans overflow-hidden relative">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-800 to-purple-900 -z-10"></div>
        
        {/* Top: Question - Auto height, clamped text size */}
        <div className="flex-none w-full p-2 md:p-4 z-20 flex justify-center">
            <div className="w-full max-w-5xl bg-white text-black shadow-lg rounded-b-lg p-4 md:p-8 animate-slide-in-down text-center">
               <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">{q.question}</h2>
            </div>
        </div>

        {/* Middle: Timer & Results - Takes remaining space */}
        <div className="flex-grow min-h-0 flex flex-col justify-center items-center relative z-10">
           {/* Timer Circle */}
           {!isRevealed && (
             <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-purple-700 border-4 border-white flex items-center justify-center text-4xl md:text-6xl font-bold shadow-xl animate-pulse">
                {timeLeft}
             </div>
           )}

           {/* Result Overlay */}
           {isRevealed && (
             <div className={`absolute inset-0 flex flex-col items-center justify-center z-50 backdrop-blur-sm bg-black/40 animate-pop-in p-4`}>
                <div className={`bg-white text-black p-6 md:p-10 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-lg w-full transform ${!isCorrect ? 'animate-shake' : 'animate-elastic-pop'}`}>
                   <div className="text-5xl md:text-7xl mb-2">{isCorrect ? '🎉' : '😢'}</div>
                   <h3 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-wider">{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                   
                   {!isCorrect && (
                     <div className="mt-4 bg-red-100 p-4 rounded-lg w-full">
                       <p className="text-sm md:text-base opacity-60 font-bold uppercase">Correct Answer</p>
                       <p className="text-xl md:text-2xl font-bold text-red-600 mt-1">{q.options ? q.options[q.correctOption!] : q.answer}</p>
                     </div>
                   )}

                   {isCorrect && (
                     <div className="mt-4 flex flex-col gap-2">
                        <div className="bg-black text-white px-6 py-2 rounded-full font-mono text-lg md:text-xl">
                          + {score} Points
                        </div>
                     </div>
                   )}
                </div>
             </div>
           )}
        </div>

        {/* Bottom: Options Grid - Fixed percentage height to ensure playability */}
        <div className="flex-none h-[45%] md:h-[40%] w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2 md:p-6 pb-4 md:pb-6 z-20">
           {q.options ? (
             currentShuffledIndices.map((originalIndex, i) => {
               const kStyle = kahootColors[i % 4];
               const Icon = kStyle.icon;
               const isThisCorrect = originalIndex === q.correctOption;
               const isDimmed = isRevealed && !isThisCorrect;

               return (
                 <button
                   key={originalIndex}
                   onMouseEnter={handleHover}
                   onClick={() => handleOptionClick(originalIndex)}
                   disabled={isRevealed}
                   className={`${kStyle.bg} ${kStyle.border} w-full h-full rounded-lg shadow-lg transform transition-all active:scale-95 flex items-center px-4 md:px-8 gap-4 md:gap-6 relative overflow-hidden group
                     ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'}
                     ${!isRevealed ? 'animate-slide-up-fade' : ''}
                   `}
                   style={{ animationDelay: `${i * 100}ms` }}
                 >
                   <div className="flex-none w-10 h-10 md:w-16 md:h-16 flex items-center justify-center">
                      <Icon />
                   </div>
                   
                   <span className="text-lg md:text-2xl lg:text-3xl font-bold text-white text-left text-shadow leading-tight line-clamp-3">
                     {q.options![originalIndex]}
                   </span>

                   {!isRevealed && <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>}
                 </button>
               );
             })
           ) : (
             <div className="col-span-1 md:col-span-2 flex items-center justify-center h-full">
                 <button onClick={() => setQuizState({revealed: true})} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-2xl shadow-xl hover:scale-105 transition-transform">Reveal Answer</button>
             </div>
           )}
        </div>
      </div>
    );
  }

  // Process / Timeline Slide
  const isProcessSlide = slide.type === 'grammar' || slide.title.includes('Process') || slide.title.includes('Timeline');

  if (isProcessSlide) {
     return (
        <div ref={containerRef} className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text} flex flex-col relative`}>
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 fixed" />
          <h2 className={`text-3xl md:text-5xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead} animate-enter-slide-right relative z-10`}>
            {slide.title}
          </h2>
          
          <div className={`flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative pl-8 md:pl-20 py-12 md:py-20 z-10`}>
             <svg className="absolute left-[46px] md:left-[98px] top-0 bottom-0 h-full w-10 overflow-visible pointer-events-none">
               <line x1="2" y1="0" x2="2" y2="100%" stroke="currentColor" strokeWidth="4" className={`${styles.accent} opacity-30`} />
               <path d={`M 2 0 V ${slide.content.text ? slide.content.text.length * 150 + 200 : 800}`} stroke="currentColor" strokeWidth="4" fill="none" className={`${styles.accent} animate-draw-line`} />
             </svg>

             {slide.content.heading && (
               <h3 className={`text-2xl md:text-4xl font-bold mb-12 md:mb-16 ${styles.accent} animate-enter-slide-up`}>{slide.content.heading}</h3>
             )}
             
             <div className="space-y-12 md:space-y-16">
              {slide.content.text?.map((paragraph, idx) => (
                <div key={idx} className={`relative group perspective-1000`}>
                   <div className={`absolute -left-[54px] md:-left-[94px] top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full ${styles.bg} border-4 ${styles.border} z-20 shadow-[0_0_20px_currentColor] ${styles.accent} animate-elastic-pop flex items-center justify-center`} style={{ animationDelay: `${idx * 400}ms` }}>
                     <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-current animate-ping`}></div>
                   </div>
                   <div className={`absolute -left-[40px] md:-left-[80px] top-1/2 w-8 md:w-20 h-1 ${styles.accentBg} origin-left animate-draw-line`} style={{ animationDelay: `${idx * 400 + 200}ms` }}></div>
                   <div className={`p-6 md:p-8 rounded-2xl ${styles.card} relative overflow-hidden transition-all duration-500 transform hover:scale-105 hover:rotate-1 opacity-0 animate-enter-slide-right hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]`} style={{ animationDelay: `${idx * 400 + 300}ms` }}>
                       <div className="relative z-10 flex items-center gap-4 md:gap-6">
                          <span className={`text-5xl md:text-7xl font-bold opacity-10 ${styles.fontHead} absolute -right-4 -bottom-8 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700`}>{idx + 1}</span>
                          <p className="text-lg md:text-2xl leading-relaxed font-light">{paragraph}</p>
                       </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
     );
  }

  // Default Slide
  return (
    <div ref={containerRef} className={`h-full w-full p-6 md:p-12 overflow-y-auto ${styles.bg} ${styles.text} flex flex-col relative`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 fixed" />
      <h2 className={`text-3xl md:text-4xl font-bold mb-8 pb-4 border-b ${styles.border} ${styles.fontHead} animate-enter-slide-right relative z-10`}>
        {slide.title}
      </h2>
      
      <div className={`flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full relative z-10`}>
        {slide.content.heading && (
          <h3 className={`text-xl md:text-2xl font-bold mb-6 ${styles.accent}`}>{slide.content.heading}</h3>
        )}
        
        <div className="space-y-6">
          {slide.content.text?.map((paragraph, idx) => (
            <div key={idx} onMouseEnter={handleHover} className={`p-6 rounded-xl ${styles.card} flex gap-4 items-start animate-enter-slide-up hover:scale-[1.01] transition-transform`} style={{animationDelay: `${idx * 100}ms`}}>
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