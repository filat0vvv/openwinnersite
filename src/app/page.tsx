"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, ShieldCheck, Github, Settings2, Users, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rollingName, setRollingName] = useState("");
  
  // Настройки фильтров
  const [onlyUnique, setOnlyUnique] = useState(true);
  const [minMentions, setMinMentions] = useState(0);

  // Тестовые данные (в будущем заменятся на ответ от API)
  const mockParticipants = [
    "@alex_winner", "@maria_nice", "@ivan_777", "@lucky_guy", 
    "@star_girl", "@dmitry_dev", "@crypto_king", "@julia_smile"
  ];

  const startDraw = async () => {
    if (!url || loading) return;
    setLoading(true);
    setWinner(null);

    try {
      // Имитация задержки сети и парсинга
      let iterations = 0;
      const maxIterations = 40; // Длительность прокрутки барабана
      
      const interval = setInterval(() => {
        // Выбираем случайное имя для эффекта "бегающих строк"
        const randomIndex = Math.floor(Math.random() * mockParticipants.length);
        setRollingName(mockParticipants[randomIndex]);
        
        iterations++;

        if (iterations >= maxIterations) {
          clearInterval(interval);
          finalizeWinner(mockParticipants);
        }
      }, 80); // Скорость смены имен (80мс)

    } catch (error) {
      console.error("Ошибка:", error);
      setLoading(false);
    }
  };

  const finalizeWinner = (list: string[]) => {
    const final = list[Math.floor(Math.random() * list.length)];
    setWinner(final);
    setLoading(false);
    
    // Праздничный салют
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#a855f7']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#6366f1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-indigo-500/30 font-sans">
      {/* Навигация */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <Zap size={20} fill="white"/>
          </div>
          OpenWinner
        </div>
        <a href="https://github.com/filat0vvv" target="_blank" rel="noreferrer" className="p-2 hover:bg-white/5 rounded-full transition">
          <Github size={24}/>
        </a>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Fair Choice. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              No Data Logs.
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Прозрачный инструмент для проведения розыгрышей. Мы не сохраняем ваши данные и не требуем логина.
          </p>
        </motion.div>

        {/* Основная панель */}
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-sm mb-8">
          
          {/* Ввод ссылки */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1 group">
              <input 
                type="text" 
                placeholder="Вставьте ссылку на пост Instagram..." 
                className="w-full bg-slate-900/50 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              onClick={startDraw}
              disabled={loading || !url}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Крутим барабан...
                </span>
              ) : "Выбрать победителя"}
            </button>
          </div>

          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left border-t border-white/5 pt-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <Users size={18} className="text-indigo-400"/>
                <span className="text-sm font-medium">Только уникальные</span>
              </div>
              <input 
                type="checkbox" 
                checked={onlyUnique} 
                onChange={() => setOnlyUnique(!onlyUnique)}
                className="w-5 h-5 accent-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <Settings2 size={18} className="text-purple-400"/>
                <span className="text-sm font-medium">Мин. отметок друзей</span>
              </div>
              <select 
                value={minMentions}
                onChange={(e) => setMinMentions(Number(e.target.value))}
                className="bg-slate-800 border-none rounded-lg text-xs p-1 outline-none"
              >
                {[0,1,2,3,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Футер формы */}
        <div className="flex justify-center gap-8 text-slate-500 text-xs font-medium uppercase tracking-widest">
          <span className="flex items-center gap-2 hover:text-indigo-400 transition cursor-default"><ShieldCheck size={14}/> No Database</span>
          <span className="flex items-center gap-2 hover:text-indigo-400 transition cursor-default"><CheckCircle2 size={14}/> Verified Random</span>
        </div>

        {/* Секция результата */}
        <AnimatePresence mode="wait">
          {(loading || winner) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-12 relative"
            >
              <div className="p-1 border-[3px] border-indigo-500/20 rounded-[3rem] inline-block">
                <div className="bg-gradient-to-b from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl px-16 py-12 rounded-[2.8rem] border border-white/10 relative overflow-hidden min-w-[320px]">
                  <Trophy className="absolute -top-10 -right-10 text-indigo-500/5 rotate-12" size={240} />
                  
                  <h2 className="text-indigo-300 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                    {loading ? "Идет выбор..." : "Результат розыгрыша"}
                  </h2>
                  
                  <div className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
                    {loading ? (
                      <span className="opacity-50 italic">{rollingName}</span>
                    ) : (
                      <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                        {winner}
                      </span>
                    )}
                  </div>

                  {!loading && (
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "100%" }} 
                      className="h-1 bg-indigo-500 mt-6 mx-auto rounded-full"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}