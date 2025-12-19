import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Slide } from '../types';

interface AITutorProps {
  currentSlide: Slide;
  themeColor: string;
}

export const AITutor: React.FC<AITutorProps> = ({ currentSlide, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [response]);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      if (!process.env.API_KEY) {
         throw new Error("API Key not found. Please set REACT_APP_GEMINI_API_KEY.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct context based on slide content
      const context = `
        You are an expert academic tutor. The student is currently viewing a slide titled "${currentSlide.title}".
        Content of the slide: 
        ${currentSlide.content.heading || ''}
        ${currentSlide.content.text?.join('\n') || ''}
        ${currentSlide.content.vocabList?.map(v => `${v.word}: ${v.definition}`).join('\n') || ''}
        ${currentSlide.content.quizList?.map(q => `Q: ${q.question} A: ${q.answer}`).join('\n') || ''}
        
        The student asks: "${query}"
        
        Provide a concise, helpful, and encouraging answer suitable for an IELTS student. Limit response to 100 words.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: context,
      });

      setResponse(result.text || "I couldn't generate a response.");
    } catch (err: any) {
      console.error(err);
      setError("AI Service unavailable (Check API Key). " + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 md:w-96 rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-white text-gray-800 flex flex-col`}>
          <div className={`p-4 ${themeColor} text-white font-bold flex justify-between items-center`}>
            <span>AI Tutor</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">✕</button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 text-sm space-y-3">
             <div className="bg-blue-100 p-3 rounded-lg rounded-tl-none self-start mr-8">
               Hello! I can help you understand this slide about <strong>{currentSlide.title}</strong>. What's your question?
             </div>
             
             {query && response && (
                <div className="bg-gray-200 p-3 rounded-lg rounded-tr-none self-end ml-8 text-right">
                  {query}
                </div>
             )}

             {loading && (
               <div className="flex items-center space-x-2 text-gray-500 text-xs">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                 <span>Thinking...</span>
               </div>
             )}

             {response && (
               <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none shadow-sm">
                 {response}
               </div>
             )}
             
             {error && (
               <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs">
                 {error}
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="Ask a question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button 
              onClick={handleAsk}
              disabled={loading}
              className={`${themeColor} text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:opacity-90 disabled:opacity-50`}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className={`${themeColor} text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform`}
        >
          <span>✨ Ask AI Tutor</span>
        </button>
      )}
    </div>
  );
};