import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Slide } from '../types';

interface AITutorProps {
  currentSlide: Slide;
  themeColor: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AITutor: React.FC<AITutorProps> = ({ currentSlide, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I can help you understand this slide. What\'s your question?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Reset chat when slide changes
  useEffect(() => {
     setMessages([{ role: 'model', text: `Hello! I can help you understand this slide about "${currentSlide.title}". What's your question?` }]);
     setError(null);
  }, [currentSlide.id]);

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMsg: Message = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);
    setError(null);

    try {
      if (!process.env.API_KEY) {
         throw new Error("API Key not found. Please set REACT_APP_GEMINI_API_KEY.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct context based on slide content
      // We send the current slide content + the last few messages for context if needed, 
      // but 'generateContent' is stateless, so we provide the necessary context in the prompt.
      const slideContext = `
        You are an expert academic tutor. The student is currently viewing a slide titled "${currentSlide.title}".
        Content of the slide: 
        ${currentSlide.content.heading || ''}
        ${currentSlide.content.text?.join('\n') || ''}
        ${currentSlide.content.vocabList?.map(v => `${v.word}: ${v.definition}`).join('\n') || ''}
        ${currentSlide.content.quizList?.map(q => `Q: ${q.question} A: ${q.answer}`).join('\n') || ''}
        
        Respond to the user's question based on this context. 
        Keep the answer concise (under 100 words) and encouraging.
      `;

      const prompt = `${slideContext}\n\nUser Question: ${userMsg.text}`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const responseText = result.text || "I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (err: any) {
      console.error(err);
      setError("AI Service unavailable (Check API Key). " + (err.message || ''));
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please check your API key." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}>
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 md:w-96 rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-white text-gray-800 flex flex-col animate-pop-in`}>
          <div className={`p-4 ${themeColor} text-white font-bold flex justify-between items-center`}>
            <span>AI Tutor</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">✕</button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto bg-gray-50 text-sm space-y-3">
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-gray-200 rounded-tr-none text-gray-800' 
                      : 'bg-blue-100 rounded-tl-none text-gray-900'
                  }`}>
                    {msg.text}
                  </div>
               </div>
             ))}

             {loading && (
               <div className="flex justify-start">
                  <div className="bg-blue-50 p-3 rounded-lg rounded-tl-none flex items-center space-x-2 text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
               </div>
             )}
             
             {error && (
               <div className="bg-red-50 text-red-600 p-2 rounded text-xs text-center">
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