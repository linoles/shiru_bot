'use client'

import { useEffect, useState } from 'react'
import "@/src/app/globals.css";

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
  casinoBet: number;
}

export default function ClientComponent({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [curUser, setCurUser] = useState<User>({ tgId: 0, tgNick: '', tgUsername: '', points: 0, lvl: 1, points_from: { rsp: 0, casino: 0, emoji: 0, distribute: 0, feud: 0 }, casinoBet: 100 });
  const [tgData, setTgData] = useState<any>(null);

  const symbols = ['🍇', '🍋', 'BAR', '7️⃣'];
  const rand_choices = ["🍀", "🍀", "🍀"];
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

  let [res, setRes] = useState("x1 (=0$)");
  let [resColor, setResColor] = useState("stone");
  let [int, setInt] = useState(rand_choices.map((choice, index) => (<div key={index} className={`h-[30vw] w-[30vw] bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`${choice}.png`} className="w-[60%]"></img></div>)))

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        setTgData(tg.initDataUnsafe?.user);
        tg.BackButton.onClick(() => location.href = '/');
        tg.BackButton.show();
        const mb = tg.MainButton;
        mb.enable();
        mb.setParams({ text: "Бесплатная игра" });
        // mb.showProgress(true);
        mb.onClick(() => location.href = "/casino/free");
        mb.show();
        const sb = tg.SecondaryButton;
        sb.enable();
        const curUser = users.find(u => u.tgId === window.Telegram?.WebApp.initDataUnsafe?.user.id);
        if (curUser === undefined || curUser.points === undefined || curUser.points < 100) {
          alert("Недостаточно очков!");
          return;
        }
        sb.setParams({ text: `Крутить ($${curUser.casinoBet} очков)` });
        sb.onClick(async () => {
          try {
            setRes("...");
            setResColor("stone");
            sb.disable();
            setInt(rand_choices.map((choice, index) => (<div key={index} className={`h-[30vw] w-full bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`${choice}.png`} className="w-[60%]"></img></div>)));
            await new Promise(resolve => setTimeout(resolve, 2000));
            const newRandChoices = [symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)]];
            setInt(newRandChoices.map((choice, index) => (<div key={index} className={`h-[30vw] w-full bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`${choice}.png`} className="w-[60%]"></img></div>)));
            sb.enable();
            const curUser = users.find(u => u.tgId === window.Telegram?.WebApp.initDataUnsafe?.user.id);
            if (curUser === undefined || curUser.points === undefined || curUser.points < 100) {
              alert("Недостаточно очков!");
              return;
            } else if (curUser.casinoBet > curUser.points) {
              alert("Недостаточно очков! Сделайте другую ставку.");
              return;
            }
            const payoutKey = newRandChoices.join('')
            const payout = payouts[payoutKey] || 0
            if (payout <= 16) {
              setRes(`x0 (-${curUser.casinoBet}$)`);
              setResColor("red");
              curUser.points -= curUser.casinoBet;
              curUser.points_from.casino -= curUser.casinoBet;
            } else if (payout >= 17 && payout < 32) {
              setRes(`x0.5 (-${curUser.casinoBet / 2}$)`);
              setResColor("red");
              curUser.points -= (curUser.casinoBet / 2);
              curUser.points_from.casino -= (curUser.casinoBet / 2);
            } else if (payout == 32) {
              setRes("x1 (=0$)");
              setResColor("stone");
            } else if (payout >= 33 && payout <= 48) {
              setRes(`x1.4 (+${curUser.casinoBet * 1.4 - curUser.casinoBet}$)`);
              setResColor("green");
              curUser.points += (curUser.casinoBet * 1.4 - curUser.casinoBet);
              curUser.points_from.casino += (curUser.casinoBet * 1.4 - curUser.casinoBet);
            } else if (payout >= 49 && payout < 64) {
              setRes(`x1.8 (+${curUser.casinoBet * 1.8 - curUser.casinoBet}$)`);
              setResColor("green");
              curUser.points += (curUser.casinoBet * 1.8 - curUser.casinoBet);
              curUser.points_from.casino += (curUser.casinoBet * 1.8 - curUser.casinoBet);
            } else {
              setRes(`х5 (+${curUser.casinoBet * 5 - curUser.casinoBet}$)`);
              setResColor("green");
              curUser.points += (curUser.casinoBet * 5 - curUser.casinoBet);
              curUser.points_from.casino += (curUser.casinoBet * 5 - curUser.casinoBet);
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
        });
        sb.show();
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (!tgData?.id) return

    const checkAndAddUser = async () => {
      const exists = users.some(u => u.tgId === tgData.id);
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
  }, [tgData, users]);

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
          <div className="w-full max-w-xs mx-auto p-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-screen px-3">
              <div className="flex w-full mx-4 space-x-3">
                {int}
              </div>
            </div>
            <div className="w-screen flex items-end justify-end mb-2">
              <div className={`font-semibold text-xl py-0.5 inline-flex items-center rounded-full border px-2.5 mt-2 mr-2 transition-colors focus:outline-none focus:ring-2 focus:ring-${resColor} focus:ring-offset-2 hover:bg-${resColor}/80 bg-${resColor}/10 text-${resColor} border-${resColor}/20`}>{res}</div>
            </div>
            <h3 className="text-lg font-bold text-muted-foreground">СТАВКА</h3>
            <div className="w-screen flex flex-col space-y-2">
              <div className="w-full flex items-center justify-between space-x-2 mx-1">
                <div className="w-full shadow-sm p-3 text-center bg-card rounded-xl border-primary border-primary/50">
                  ${Math.floor(curUser.points / 5)}
                </div>
                <div className="w-full shadow-sm p-3 text-center bg-card rounded-xl border-primary border-primary/50">
                  ${Math.floor(curUser.points / 4)}
                </div>
                <div className="w-full shadow-sm p-3 text-center bg-card rounded-xl border-primary border-primary/50">
                  ${Math.floor(curUser.points / 3)}
                </div>
                <div className="w-full shadow-sm p-3 text-center bg-card rounded-xl border-primary border-primary/50">
                  ${Math.floor(curUser.points / 2)}
                </div>
                <div className="w-full shadow-sm p-3 text-center bg-card rounded-xl border-primary border-primary/50">
                  ${Math.floor(curUser.points)}
                </div>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const input = target.querySelector('input[type="number"]') as HTMLInputElement;
                  window.Telegram.WebApp.SecondaryButton.setParams({ text: `Крутить (${input.value})` })
                  if (input.valueAsNumber > curUser.points) {
                    alert('Ставка не может быть больше, чем у вас есть на счету!');
                    return;
                  }
                  const response = await fetch('/api/save-user', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ...curUser,
                      casinoBet: input.valueAsNumber,
                    }),
                  });
                  if (!response.ok) {
                    alert(`Ошибка при сохранении ставки! ${response.statusText}`);
                    return;
                  }
                  const newUser = await response.json();
                  setCurUser(newUser);
                  input.value = '';
                }}
              >
                <div className="w-[calc(100%-4px)] border-primary mx-1 mt-2 text-center border-primary/50 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 space-x-2 flex flex-row justify-between">
                  <input
                    type="number"
                    max={curUser.points}
                    min={100}
                    placeholder="Введите ставку..."
                    className="hover:border-0 focus:border-0 focus:outline-none p-3 w-[60%] text-start bg-card rounded-xl shadow-sm"
                    style={{ padding: '0.75rem' }}
                  />
                  <input type="submit" value="Поставить" className="p-3 w-[40%] bg-primary text-card-foreground rounded-lg" style={{ padding: '0.75rem' }} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}