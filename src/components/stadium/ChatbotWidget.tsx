"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Mic } from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function ChatbotWidget({ stadiumName }: { stadiumName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Welcome to ${stadiumName}! I am your interactive guide. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, stadiumName }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting to my brain right now. Please try again later!" }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <ScrollReveal className="bg-blush w-[350px] md:w-[400px] h-[500px] rounded-3xl shadow-2xl border border-rose/20 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-rose p-6 flex items-center justify-between text-blush">
            <div className="flex items-center gap-3">
              <div className="bg-blush/20 p-2 rounded-xl">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest italic">Instadium AI</h4>
                <p className="text-[10px] opacity-70 uppercase tracking-tighter">Stadium Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-rose text-blush rounded-tr-none' : 'bg-plum/5 text-plum rounded-tl-none border border-plum/10'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-plum/5 border-t border-rose/10 flex items-center gap-2">
            <button className="p-2 text-plum/50 hover:text-rose transition-colors">
              <Mic size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-plum text-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-rose text-blush p-2 rounded-xl hover:scale-105 transition-transform"
            >
              <Send size={18} />
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-rose text-blush p-5 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 group relative"
        >
          <div className="absolute -top-2 -right-2 bg-plum text-blush text-[8px] px-2 py-1 rounded-full animate-bounce">
            AI READY
          </div>
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
