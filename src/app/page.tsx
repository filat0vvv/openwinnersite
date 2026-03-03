"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, ShieldCheck, Github, Link as LinkIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const startDraw = () => {
    setLoading(true);
    setTimeout(() => {
      setWinner("filat0vvv"); // Тестовое имя
      setLoading(false);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-cyan-500/30">
      <nav className="p-8 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
          <div className="bg-indigo-600 p-1.5 rounded-lg"><Zap size={20}/></div>
          OpenWinner
        </div>
        <a href="https://github.com/filat0vvv" target="_blank" className="hover:opacity-70 transition">
          <Github size={24}/>
        </a>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-extrabold mb-6"
        >
          Fair Choice. <span className="text-indigo-500">No Data Logs.</span>
        </motion.h1>
        
        <p className="text-slate-400 text-lg mb-12">Вставьте ссылку на пост, чтобы выбрать победителя честно и прозрачно.</p>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col md:flex-row gap-3 mb-8">
          <input 
            type="text" 
            placeholder="instagram.com/p/..." 
            className="bg-transparent flex-1 px-4 outline-none border-none text-white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={startDraw}
            disabled={loading || !url}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 px-8 py-4 rounded-xl font-bold transition-all"
          >
            {loading ? "Анализируем..." : "Выбрать победителя"}
          </button>
        </div>

        <div className="flex justify-center gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-2"><ShieldCheck size={16}/> No DB</span>
          <span className="flex items-center gap-2"><ShieldCheck size={16}/> Open Source</span>
        </div>

        <AnimatePresence>
          {winner && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="mt-16 p-10 border border-indigo-500/30 rounded-3xl bg-indigo-500/5 relative overflow-hidden"
            >
              <Trophy className="absolute -top-10 -right-10 text-indigo-500/10" size={200} />
              <h2 className="text-2xl font-bold mb-4">Наш победитель:</h2>
              <div className="text-5xl font-black text-indigo-400 italic underline">@{winner}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}