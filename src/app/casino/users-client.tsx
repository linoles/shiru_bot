'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram: any
  }
}

export interface Points_from {
  [key: string]: number;
}
export interface User {
  tgId: number;
  tgNick: string;
  tgUsername: string;
  points: number;
  lvl: number;
  points_from: Points_from;
}

export default function ClientComponent({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [curUser, setCurUser] = useState<User>({ tgId: 0, tgNick: '', tgUsername: '', points: 0, lvl: 1, points_from: { rsp: 0, casino: 0, emoji: 0, distribute: 0, feud: 0 } });
  const [tgData, setTgData] = useState<any>(null);

  const symbols = ['🍇', '🍋', 'BAR', '7️⃣'];
  const rand_choices = [symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)]];
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

  let [res, setRes] = useState("Начните играть! 🎰");
  let [int, setInt] = useState(rand_choices.map((choice, index) => (<div key={index} className={`h-[30vw] w-[30vw] bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}>{choice}</div>)))

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        console.info(tg)
        setTgData(tg.initDataUnsafe?.user);
        tg.BackButton.onClick(() => location.href = '/');
        tg.BackButton.show();
        const mb = tg.MainButton;
        mb.enable();
        mb.setParams({ text: "Бесплатная игра" });
        // mb.showProgress(true);
        mb.onClick(() => location.href = "/casino/free");
        mb.show();
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (!tgData?.id) return

    const checkAndAddUser = async () => {
      const exists = users.some(u => u.tgId === tgData.id)
      if (!exists) {
        const response = await fetch('/api/add-user', {
          method: 'POST',
          body: JSON.stringify({
            tgId: tgData.id,
            tgNick: tgData.first_name,
            tgUsername: tgData.username,
            points: 0,
            lvl: 1,
            points_from: { rsp: 0, casino: 0, emoji: 0, distribute: 0, feud: 0 }
          })
        })
        const newUser = await response.json()
        setUsers(prev => [...prev, newUser])
        setCurUser(newUser);
      } else {
        const foundUser = users.find(u => u.tgId === tgData?.id);
        if (foundUser) {
          setCurUser(foundUser);
        }
      }
    }

    checkAndAddUser()
  }, [tgData, users])

  return (
    <div id="root">
      <div role="region" aria-label="Notifications (F8)" tabIndex={-1} style={{ pointerEvents: "none" }}>
        <ol tabIndex={-1} className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"></ol>
      </div>
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false"></section>
      <div className="min-h-screen bg-background text-foreground dark">
        <div className="flex items-center justify-center p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => alert(`Вход выполнен через: ${tgData?.username ? `@${tgData.username} (id${tgData?.id})` : `${tgData?.first_name} (id${tgData?.id})`}`)}>
              <span className="text-foreground neumorph-glow">SHIRU</span>
              <span className="text-primary ml-1 green-neumorph-glow">BOT</span>
            </h1>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse green-neumorph-glow"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4"><span className="text-sm text-muted-foreground">Общий прогресс</span><span className="text-sm font-medium"><span className="text-destructive">{curUser?.points}</span><span className="text-muted-foreground ml-1">очков</span></span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
              <div className="p-3 text-center">
                <div className="text-lg font-bold text-primary">{users.find(u => u.tgId === tgData?.id)?.points}</div>
                <div className="text-xs text-muted-foreground">Очки</div>
              </div>
            </div>
            <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
              <div className="p-3 text-center">
                <div className="text-lg font-bold text-yellow-400">{curUser?.lvl}</div>
                <div className="text-xs text-muted-foreground">Уровень</div>
              </div>
            </div>
            <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border">
              <div className="p-3 text-center">
                <div className="text-lg font-bold text-secondary">#{users.sort((a, b) => b.points - a.points).findIndex(u => u.tgId === tgData?.id) + 1}</div>
                <div className="text-xs text-muted-foreground">Рейтинг</div>
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold text-muted-foreground">КАЗИНО</h2>
          <div className="w-full max-w-md mx-auto p-4 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg">
            {/* Сообщение о выигрыше */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">КАЗИНО</h2>
              <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-3 rounded-lg">
                <p className="font-bold text-lg">{res}</p>
              </div>
            </div>

            {/* Слот-машина */}
            <div className="flex justify-between space-x-3 mb-6">
              {int}
            </div>

            {/* Кнопка ставки */}
            <button
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xl rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              onClick={async () => {
                try {
                  if (curUser.points < 100) {
                    alert("Недостаточно очков!");
                    return;
                  }
                  const newRandChoices = [symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)]];
                  setInt(newRandChoices.map((choice, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-center h-20 w-full bg-white rounded-xl shadow-md text-4xl ${choice}`}
                    >
                      {choice}
                    </div>
                  )))

                  // Остальная логика остается без изменений...
                  const payoutKey = newRandChoices.join('')
                  const payout = payouts[payoutKey] || 0

                  if (payout <= 16) {
                    setRes("Вы проиграли всё! 😳");
                    curUser.points -= 100;
                  } else if (payout >= 17 && payout < 32) {
                    setRes(`Вам вернулось x0.5 вашей ставки! 💩`);
                    curUser.points -= 50;
                  } else if (payout == 32) {
                    setRes("Вы сохранили свою ставку! 😐");
                  } else if (payout >= 33 && payout <= 48) {
                    setRes("Вам вернулось x1.5 вашей ставки! 😎");
                    curUser.points += 50;
                  } else if (payout >= 49 && payout < 64) {
                    setRes("Вам вернулось x2 вашей ставки! 🎉");
                    curUser.points += 100;
                  } else {
                    setRes("Вам вернулось x3 вашей ставки! 🎉🤡🎉");
                    curUser.points += 200;
                  }

                  const response = await fetch('/api/save-user', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(curUser),
                  })

                  if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || "Ошибка сервера")
                  }

                  const result = await response.json()
                  console.log("Успешно:", result)
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Сделать ставку — $100 очков
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}