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
export interface CasinoProps {
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
  lastFreeCasino: number;
  freeCasinoNow: boolean;
  freeCasinoProps: CasinoProps
}

export default function ClientComponent({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tgData, setTgData] = useState<any>(null);
  
  useEffect(() => {
    alert(window.Telegram.WebApp.initDataUnsafe.start_param);
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.requestFullscreen();
      setTgData(tg.initDataUnsafe?.user);
      tg.BackButton.hide();
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
            points: 10000,
            lvl: 1,
            points_from: { rsp: 0, casino: 0, emoji: 0, distribute: 0, feud: 0 },
            casinoBet: 100,
            lastFreeCasino: 0,
            freeCasinoNow: false,
            freeCasinoProps: { done: 0, points: 0 }
          })
        })
        const newUser = await response.json()
        setUsers(prev => [...prev, newUser])
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
              <span className="text-foreground neumorph-glow"><b>SHIRU</b></span>
              <span className="text-primary ml-1 green-neumorph-glow"><b>BOT</b></span>
            </h1>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse green-neumorph-glow"></div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4"><span className="text-sm text-muted-foreground">Общий прогресс</span><span className="text-sm font-medium"><span className="text-destructive">{users.find(u => u.tgId === tgData?.id)?.points}</span><span className="text-muted-foreground ml-1">очков</span></span>
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
                <div className="text-lg font-bold text-yellow-400">{users.find(u => u.tgId === tgData?.id)?.lvl}</div>
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
          <h2 className="text-lg font-bold mb-4 text-muted-foreground">ВЫБЕРИ ИГРУ</h2>
        </div>
        <div className="px-4 space-y-3">
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => location.href = "/rsp"}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-[48px] h-12 flex items-center justify-center rounded-xl bg-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scissors text-white">
                      <circle cx="6" cy="6" r="3"></circle>
                      <path d="M8.12 8.12 12 12"></path>
                      <path d="M20 4 8.12 15.88"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M14.8 14.8 20 20"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground neumorph-glow">КНБ</h3>
                    <p className="text-sm text-muted-foreground">Сыграй в КНБ</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Игроков</div>
                    <div className="font-medium text-primary">∞</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2"><span className="text-sm text-muted-foreground">0%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-muted-foreground">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-destructive/10 text-destructive border-destructive/20">{users.find(u => u.tgId === tgData?.id)?.points_from.rsp}</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => location.href = "/casino"}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins text-white">
                      <circle cx="8" cy="8" r="6"></circle>
                      <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                      <path d="M7 6h1v4"></path>
                      <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground neumorph-glow">Казино</h3>
                    <p className="text-sm text-muted-foreground">Рулетка и слоты</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Игроков</div>
                    <div className="font-medium text-primary">∞</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2"><span className="text-sm text-muted-foreground">0%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-muted-foreground">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-destructive/10 text-destructive border-destructive/20">{users.find(u => u.tgId === tgData?.id)?.points_from.casino}</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => location.href = "/emoji"}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-puzzle text-white">
                      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground neumorph-glow">Эмодзи-пазл</h3>
                    <p className="text-sm text-muted-foreground">Собери картинку</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Игроков</div>
                    <div className="font-medium text-primary">∞</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2"><span className="text-sm text-muted-foreground">0%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-muted-foreground">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-destructive/10 text-destructive border-destructive/20">{users.find(u => u.tgId === tgData?.id)?.points_from.emoji}</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => location.href = "/distribute"}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gift text-white">
                      <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                      <path d="M12 8v13"></path>
                      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground neumorph-glow">Розыгрыш</h3>
                    <p className="text-sm text-muted-foreground">Испытай удачу</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Игроков</div>
                    <div className="font-medium text-primary">∞</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2"><span className="text-sm text-muted-foreground">0%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-muted-foreground">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-destructive/10 text-destructive border-destructive/20">{users.find(u => u.tgId === tgData?.id)?.points_from.distribute}</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border text-card-foreground shadow-sm bg-card border-border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => location.href = "/feud"}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target text-white">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground neumorph-glow">Сто к одному</h3>
                    <p className="text-sm text-muted-foreground">Угадай ответ</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Игроков</div>
                    <div className="font-medium text-primary">∞</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-muted-foreground">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2"><span className="text-sm text-muted-foreground">0%</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy text-muted-foreground">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-destructive/10 text-destructive border-destructive/20">{users.find(u => u.tgId === tgData?.id)?.points_from.feud}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-6"></div>
      </div>
    </div>
  )
}