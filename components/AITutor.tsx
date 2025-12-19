import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Slide, ThemeType } from '../types';

interface AITutorProps {
  currentSlide: Slide;
  themeColor: string;
  theme: ThemeType;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTIONS = [
  "Explain this slide simply",
  "Give me a real-world example",
  "Quiz me on this topic",
  "Summarize key points"
];

export const AITutor: React.FC<AITutorProps> = ({ currentSlide, themeColor, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Greeting
  useEffect(() => {
     setMessages([{ role: 'model', text: `I'm ready to help with "${currentSlide.title}". What do you need?` }]);
  }, [currentSlide.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleAsk = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      if (!process.env.API_KEY) {
         throw new Error("Missing API Key");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Context: Educational slide titled "${currentSlide.title}".
        Theme: ${theme}.
        Content: ${JSON.stringify(currentSlide.content)}
        
        Task: Answer the student's question efficiently. Be encouraging. Max 80 words.
        Student: ${text}
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'model', text: result.text || "I'm thinking..." }]);

    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Chat Container */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-pop-in bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl text-sm">
          {/* Header */}
          <div className={`${themeColor} p-4 text-white font-bold flex justify-between items-center shadow-md`}>
            <div className="flex items-center gap-2">
              <span className="animate-pulse">✨</span> AI Tutor
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-100 dark:border-gray-700'
                  }`}>
                    {msg.text}
                  </div>
               </div>
             ))}
             {loading && (
               <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="p-2 flex gap-2 overflow-x-auto custom-scrollbar border-t border-gray-200 dark:border-gray-700">
            {SUGGESTIONS.map((s, i) => (
              <button 
                key={i}
                onClick={() => handleAsk(s)}
                className="whitespace-nowrap px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-xs rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex gap-2">
            <input 
              className="flex-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk(query)}
            />
            <button 
              onClick={() => handleAsk(query)}
              disabled={loading || !query.trim()}
              className={`${themeColor} text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:scale-100`}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Launcher */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className={`group flex items-center gap-2 ${themeColor} text-white px-5 py-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-float-delayed`}
        >
          <span className="text-xl">🤖</span>
          <span className="font-bold pr-2">Tutor</span>
          <span className="bg-white text-black text-xs font-bold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2">1</span>
        </button>
      )}
    </div>
  );
};