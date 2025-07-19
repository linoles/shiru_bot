'use client'

import { useEffect, useRef, useState } from 'react'
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

  useEffect(() => {
    try {
      const tg = window.Telegram.WebApp;
      tg.ready();
      if (tg) {
        setTgData(tg.initDataUnsafe?.user);
        tg.BackButton.onClick(() => location.href = "/casino");
        tg.BackButton.show();
      }
    } catch (error) {
      console.error(error);
    }
  });

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
    <div id="root" className="overflow-hidden overflow-x-hidden overflow-y-hidden">
      <div role="region" aria-label="Notifications (F8)" tabIndex={-1} style={{ pointerEvents: "none" }}>
        <ol tabIndex={-1} className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"></ol>
      </div>
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false"></section>
      <div className="min-h-screen bg-background text-foreground dark overflow-hidden overflow-x-hidden overflow-y-hidden">
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
          <h2 className="text-lg font-bold text-muted-foreground">БЕСПЛАТНОЕ КАЗИНО</h2>
        </div>
      </div>
    </div>
  )
}