import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Bot, User, Minimize2, Loader2, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

export const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'msg-0',
    sender: 'ai',
    text: "Hello! I am AakaashSetu AI. Ask me about air quality trends, health guidelines, or environmental policies.",
    timestamp: new Date().toISOString()
  }]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/v2/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: userMsg.text, location: "Jaipur" })
      });

      if (!response.ok) throw new Error("AI core network processing mismatch.");
      const payload = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: payload.ai_response,
        sources: payload.sources_retrieved,
        timestamp: payload.timestamp
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI service link routing failure:", error);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: "My neural link to the backend engine is currently offline. Please ensure the Python FastAPI server is running on port 8000.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all transform hover:-translate-y-1 z-50 flex items-center gap-2 group"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="font-bold tracking-wider text-sm pr-2 overflow-hidden w-0 group-hover:w-32 transition-all duration-300 whitespace-nowrap">Ask AakaashSetu</span>
      </button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 w-96 flex flex-col shadow-2xl z-50 transition-all duration-500 ${isMinimized ? 'h-14' : 'h-[32rem]'}`}>
      {/* Header */}
      <div className="bg-[#16191c]/90 backdrop-blur-xl border border-gray-700/50 rounded-t-2xl p-4 flex justify-between items-center cursor-pointer shadow-lg z-10" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-5 h-5 text-sky-400" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-[#16191c] animate-pulse"></span>
          </div>
          <span className="font-bold text-gray-100 tracking-tight text-sm">AakaashSetu AI Assistant</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button className="hover:text-white transition-colors p-1" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
            <Minimize2 className="w-4 h-4" />
          </button>
          <button className="hover:text-red-400 transition-colors p-1" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Container */}
      {!isMinimized && (
        <div className="flex-1 bg-[#16191c]/80 backdrop-blur-md border-x border-b border-gray-800/50 rounded-b-2xl flex flex-col overflow-hidden">
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <Bot className="w-6 h-6 text-sky-500 mr-2 mt-1 opacity-70 flex-shrink-0" />}
                
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                    : 'bg-slate-800/60 border border-slate-700 text-gray-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-700/50 text-[10px] text-gray-400">
                      <span className="font-semibold text-sky-400">Sources:</span> {msg.sources[0].substring(0, 50)}...
                    </div>
                  )}
                </div>
                
                {msg.sender === 'user' && <User className="w-6 h-6 text-indigo-400 ml-2 mt-1 opacity-70 flex-shrink-0" />}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                <span className="text-xs font-medium italic">Analyzing vector matrices...</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#111315] border-t border-gray-800">
            <form onSubmit={handleSubmit} className="flex items-end gap-2 bg-[#1a1d21] p-2 rounded-xl border border-gray-700 focus-within:border-sky-500/50 transition-colors shadow-inner">
              <button type="button" className="p-2 text-gray-400 hover:text-white transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask about air quality trends, policies..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-100 resize-none max-h-32 min-h-[40px] py-2"
                rows={1}
              />
              
              <button 
                type="submit" 
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center justify-center shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
};
