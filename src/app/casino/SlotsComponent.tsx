"use client";

import { useState, useRef, useEffect } from 'react';

const TelegramSlots = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [balance, setBalance] = useState(1000);
  const [winAmount, setWinAmount] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[][]>([[], [], []]);
  const spinTimeout = useRef<NodeJS.Timeout>(null as unknown as NodeJS.Timeout);

  const symbols = ['🍇', '🍋', 'BAR', '7️⃣'];

  const payouts: { [key: string]: number } = {
    "7️⃣7️⃣7️⃣": 64,
    "🍋🍋🍋": 43,
    "🍇🍇🍇": 22,
    "BARBARBAR": 1,
    "7️⃣7️⃣BAR": 16,
    "7️⃣7️⃣🍇": 32,
    "7️⃣7️⃣🍋": 48,
    "🍋🍋7️⃣": 59,
    "BAR🍇7️⃣": 53,
    "🍇🍋7️⃣": 58,
    "🍇🍋🍋": 42,
    "7️⃣🍋7️⃣": 60,
    "🍋🍇🍇": 23,
    "🍇BARBAR": 2,
    "BAR🍇🍋": 37,
    "7️⃣🍇🍋": 40,
    "🍇7️⃣BAR": 14,
    "7️⃣🍋🍇": 28,
    "BARBAR🍋": 33,
    "🍋🍋BAR": 11,
    "BAR🍇🍇": 21,
    "🍇7️⃣7️⃣": 62,
    "BAR🍋BAR": 9,
    "🍇BAR7️⃣": 50,
    "🍋BAR🍋": 35,
    "7️⃣🍇7️⃣": 56,
    "🍋🍇7️⃣": 55,
    "7️⃣🍇🍇": 24,
    "🍋BAR7️⃣": 51,
    "🍇🍋🍇": 26,
    "7️⃣🍋🍋": 44,
    "🍋BARBAR": 3,
    "BARBAR7️⃣": 49,
    "BAR7️⃣BAR": 13,
    "BAR🍋7️⃣": 57,
    "🍋7️⃣🍇": 31,
    "🍋🍋🍇": 27,
    "🍇BAR🍋": 34,
    "🍇7️⃣🍋": 46,
    "BAR7️⃣🍇": 29,
    "7️⃣🍇BAR": 8,
    "🍇🍇BAR": 6,
    "BAR🍇BAR": 5,
    "BAR7️⃣7️⃣": 61,
    "🍇🍇7️⃣": 54,
    "🍇7️⃣🍇": 30,
    "🍋7️⃣BAR": 15,
    "BAR7️⃣🍋": 45,
    "🍋7️⃣🍋": 47,
    "🍋7️⃣7️⃣": 63,
    "🍇🍋BAR": 10,
    "7️⃣🍋BAR": 12,
    "7️⃣BAR🍋": 36,
    "🍋🍇BAR": 7,
    "BAR🍋🍋": 41,
    "BARBAR🍇": 17,
    "7️⃣BARBAR": 4,
    "🍇🍇🍋": 38,
    "🍋BAR🍇": 19,
    "🍋🍇🍋": 39,
    "7️⃣BAR7️⃣": 52,
    "7️⃣BAR🍇": 20,
    "🍇BAR🍇": 18
  }

  const spin = () => {
    if (isSpinning || balance < 10) return;
    
    setIsSpinning(true);
    setBalance(b => b - 10);
    setWinAmount(0);
    
    // Запуск анимации для каждого барабана
    videoRefs.current.forEach((reels, reelIdx) => {
      reels.forEach(video => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(e => console.error("Video play error:", e));
        }
      });
    });
    
    // Генерация результатов после анимации
    spinTimeout.current = setTimeout(() => {
      const newResults = [];
      for (let i = 0; i < 3; i++) {
        newResults.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      
      setResults(newResults);
      calculateWin(newResults);
      setIsSpinning(false);
    }, 3000);
  };

  const calculateWin = (combo: string[]) => {
    const comboString = combo.join('');
    const win = payouts[comboString] || 0;
    setWinAmount(win);
    if (win > 0) {
      setBalance(b => b + win);
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (spinTimeout.current) clearTimeout(spinTimeout.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-xl">
      {/* Фоновое изображение казино */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/casino_choices/casino.jpg')" }}
      />
      
      <div className="relative z-10 p-4">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">SHIRU SLOTS</h1>
            <p className="text-sm opacity-80">ID: 7 994 633 133</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-yellow-400">{balance} 🪙</div>
            <p className="text-sm opacity-80">@ShiruChatBot</p>
          </div>
        </div>
        
        {/* Игровое поле */}
        <div className="relative mb-6 bg-black bg-opacity-70 rounded-xl p-4">
          {/* Барабаны */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((reelIdx) => (
              <div key={reelIdx} className="relative w-20 h-20 overflow-hidden rounded-lg border border-yellow-400">
                {/* Видео-анимации для каждого символа */}
                {symbols.map((symbol, symbolIdx) => (
                  <video
                    key={symbolIdx}
                    ref={el => {
                      if (el) videoRefs.current[reelIdx][symbolIdx] = el;
                    }}
                    className={`absolute inset-0 w-full h-full ${isSpinning ? '' : 'hidden'}`}
                    playsInline
                    muted
                    loop={false}
                    src={`/casino_choices/${symbol}.mp4`}
                  />
                ))}
                
                {/* Статичный результат */}
                {!isSpinning && results[reelIdx] && (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {results[reelIdx]}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Результат */}
          {results.length > 0 && (
            <div className={`p-3 rounded-lg text-center ${winAmount > 0 ? 'bg-green-900 bg-opacity-70' : 'bg-gray-900 bg-opacity-70'}`}>
              <div className="text-xl font-bold mb-1">
                {results.join(' ')}
              </div>
              {winAmount > 0 && (
                <div className="text-2xl font-bold text-yellow-300">
                  +{winAmount} 🪙
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Кнопка */}
        <button
          onClick={spin}
          disabled={isSpinning || balance < 10}
          className={`w-full py-3 rounded-lg text-lg font-bold transition-all ${
            isSpinning 
              ? 'bg-gray-600 cursor-not-allowed' 
              : balance < 10 
                ? 'bg-red-600 cursor-not-allowed' 
                : 'bg-yellow-500 hover:bg-yellow-600 active:scale-95'
          } shadow-lg`}
        >
          {isSpinning ? '🌀 Крутим...' : balance < 10 ? 'Недостаточно 🪙' : '🎰 Крутить (10 🪙)'}
        </button>
        
        {/* Условия */}
        <div className="mt-4 text-center text-sm opacity-70">
          Открывая приложение, вы принимаете условия использования
        </div>
      </div>
    </div>
  );
};

export default TelegramSlots;