import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, Mic, Video, Settings, Activity } from 'lucide-react';

export default function InterviewRoom() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello John! I'm your AI Interview Coach. We'll be conducting a mock interview for the Full Stack Developer role today. Are you ready for your first question?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages([...messages, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = { 
        id: Date.now(), 
        sender: 'ai', 
        text: "That's a good approach! However, you missed mentioning state management. Could you elaborate on how you would handle complex state across multiple components?"
      };
      setMessages(prev => [...prev, aiResponse]);
      setConfidence(65);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header Stats */}
      <div className="bg-surface rounded-xl p-4 border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white">Full Stack Developer Interview</h2>
            <p className="text-xs text-slate-400">AI Coach connected • Recording active</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Confidence Score</p>
            <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-white"><Video className="w-5 h-5" /></button>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-white"><Mic className="w-5 h-5" /></button>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-white"><Settings className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-surface rounded-xl border border-slate-700/50 overflow-hidden flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'ai' ? 'bg-primary-500/20 text-primary-500' : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {msg.sender === 'ai' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`p-4 max-w-[80%] rounded-2xl ${
                  msg.sender === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-sm' : 'bg-primary-600 text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 max-w-[80%] rounded-2xl bg-slate-800 text-slate-200 rounded-tl-sm flex gap-2">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-slate-700/50 bg-background/50">
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your answer here..."
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors">
              <Mic className="w-6 h-6" />
            </button>
            <button 
              onClick={handleSend}
              className="p-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-colors"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
