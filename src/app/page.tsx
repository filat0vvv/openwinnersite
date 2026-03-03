"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Zap, ShieldCheck, Github, Settings2, Users, CheckCircle2,
  Youtube, Instagram as InstaIcon, Send, Share2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Типы соцсетей для переключателя
type SocialTab = 'instagram' | 'youtube' | 'vk' | 'telegram' | 'tiktok';

export default function Home() {
  const [activeTab, setActiveTab] = useState<SocialTab>('instagram');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rollingName, setRollingName] = useState("");
  
  // Настройки фильтров
  const [onlyUnique, setOnlyUnique] = useState(true);
  const [minMentions, setMinMentions] = useState(0);
  const [checkSub, setCheckSub] = useState(false);
  const [checkRepost, setCheckRepost] = useState(false);

  // Конфигурация тем для каждой платформы
  const theme = {
    instagram: { color: 'from-pink-500 to-purple-600', btn: 'bg-gradient-to-r from-pink-600 to-purple-600', icon: <InstaIcon size={18}/>, placeholder: 'Вставьте ссылку на пост Instagram...' },
    youtube: { color: 'from-red-500 to-red-700', btn: 'bg-red-600 hover:bg-red-500', icon: <Youtube size={18}/>, placeholder: 'Вставьте ссылку на видео YouTube...' },
    vk: { color: 'from-blue-500 to-blue-700', btn: 'bg-blue-600 hover:bg-blue-500', icon: <Share2 size={18}/>, placeholder: 'Вставьте ссылку на пост ВК...' },
    telegram: { color: 'from-sky-400 to-sky-600', btn: 'bg-sky-500 hover:bg-sky-400', icon: <Send size={18}/>, placeholder: 'Вставьте ссылку на пост в Telegram...' },
    tiktok: { color: 'from-slate-700 to-black', btn: 'bg-slate-800 hover:bg-slate-700', icon: <Zap size={18}/>, placeholder: 'Вставьте ссылку на видео TikTok...' }
  };

  const mockParticipants = [
    "@alex_winner", "@maria_nice", "@ivan_777", "@lucky_guy", 
    "@star_girl", "@dmitry_dev", "@crypto_king", "@julia_smile"
  ];

 const startDraw = async () => {
    if (!url || loading) return;
    setLoading(true);
    setWinner(null);

    try {
      // 1. Делаем реальный запрос к нашему API
      const response = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // 2. Получаем список ников из ответа
      const participants = data.participants.map((p: any) => p.username);

      // 3. Запускаем анимацию "барабана"
      let iterations = 0;
      const maxIterations = 40; 
      
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setRollingName(participants[randomIndex]);
        iterations++;

        if (iterations >= maxIterations) {
          clearInterval(interval);
          finalizeWinner(participants); // Выбираем финального победителя
        }
      }, 80);

    } catch (error) {
      console.error("Ошибка запроса:", error);
      setLoading(false);
    }
  };

  const finalizeWinner = (list: string[]) => {
    const final = list[Math.floor(Math.random() * list.length)];
    setWinner(final);
    setLoading(false);
    
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

      <main className="max-w-4xl mx-auto px-6 pt-12 pb-20 text-center">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Fair Choice. <br/>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme[activeTab].color}`}>
              Across All Platforms.
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Один инструмент для Instagram, YouTube, VK и других. Честно, быстро и без регистрации.
          </p>
        </motion.div>

        {/* Переключатель вкладок */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 p-1.5 bg-white/5 rounded-2xl border border-white/10 w-fit mx-auto backdrop-blur-md">
          {(Object.keys(theme) as SocialTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setWinner(null); setUrl(''); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all capitalize text-sm ${activeTab === tab ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <span className={activeTab === tab ? `text-transparent bg-clip-text bg-gradient-to-r ${theme[tab].color}` : ''}>
                {theme[tab].icon}
              </span>
              {tab}
            </button>
          ))}
        </div>

        {/* Основная панель */}
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-sm mb-8">
          
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <div className="relative flex-1 group">
              <input 
                type="text" 
                placeholder={theme[activeTab].placeholder} 
                className="w-full bg-slate-900/50 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button 
              onClick={startDraw}
              disabled={loading || !url}
              className={`${theme[activeTab].btn} px-10 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 min-w-[200px]`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Анализ...
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

            {/* Динамический фильтр для YouTube */}
            {activeTab === 'youtube' && (
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-3">
                  <Youtube size={18} className="text-red-500"/>
                  <span className="text-sm font-medium">Проверить подписку</span>
                </div>
                <input type="checkbox" checked={checkSub} onChange={() => setCheckSub(!checkSub)} className="w-5 h-5 accent-red-500" />
              </div>
            )}

            {/* Динамический фильтр для ВК */}
            {activeTab === 'vk' && (
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-3">
                  <Share2 size={18} className="text-blue-500"/>
                  <span className="text-sm font-medium">Проверить репост</span>
                </div>
                <input type="checkbox" checked={checkRepost} onChange={() => setCheckRepost(!checkRepost)} className="w-5 h-5 accent-blue-500" />
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <Settings2 size={18} className="text-purple-400"/>
                <span className="text-sm font-medium">Мин. отметок друзей</span>
              </div>
              <select 
                value={minMentions}
                onChange={(e) => setMinMentions(Number(e.target.value))}
                className="bg-slate-800 border-none rounded-lg text-xs p-1 outline-none font-bold"
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
              <div className={`p-1 rounded-[3rem] inline-block bg-gradient-to-r ${theme[activeTab].color}`}>
                <div className="bg-[#0F172A] backdrop-blur-2xl px-16 py-12 rounded-[2.8rem] relative overflow-hidden min-w-[320px]">
                  <Trophy className="absolute -top-10 -right-10 text-white/5 rotate-12" size={240} />
                  
                  <h2 className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                    {loading ? "Выбираем..." : "Победитель!"}
                  </h2>
                  
                  <div className="text-4xl md:text-6xl font-black text-white">
                    {loading ? (
                      <span className="opacity-30 italic">{rollingName}</span>
                    ) : (
                      <span className={`bg-gradient-to-r ${theme[activeTab].color} bg-clip-text text-transparent underline decoration-white/20`}>
                        {winner}
                      </span>
                    )}
                  </div>

                  {!loading && (
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: "100%" }} 
                      className={`h-1 mt-6 mx-auto rounded-full bg-gradient-to-r ${theme[activeTab].color}`}
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