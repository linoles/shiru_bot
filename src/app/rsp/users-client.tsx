'use client'

import { useEffect, useRef, useState } from 'react'
import "@/src/app/globals.css";
import { CasinoProps, Points_from } from '../users-client';

declare global {
  interface Window {
    Telegram: any
  }
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
  const [curUser, setCurUser] = useState<User>({ tgId: 0, tgNick: '', tgUsername: '', points: 0, lvl: 1, points_from: { rsp: 0, casino: 0, emoji: 0, distribute: 0, feud: 0 }, casinoBet: 100, lastFreeCasino: 0, freeCasinoNow: false, freeCasinoProps: { done: 0, points: 0 } });
  const [tgData, setTgData] = useState<any>(null);
  const [choiceIcons, setChoiceIcons] = useState<string[]>(["wood", "wood", "wood", "33"]);
  const [hideWood, setHideWood] = useState(false);

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      console.info(tg);
      if (tg && tg != null) {
        tg.requestFullscreen();
        setTgData(tg.initDataUnsafe?.user);
        tg.BackButton.hide();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        const newUser = await response.json();
        setUsers(prev => [...prev, newUser]);
        setCurUser(newUser);
      } else {
        setCurUser(users.find(u => u.tgId === tgData?.id)!);
      }
    }

    checkAndAddUser()
  }, [tgData, users]);

  const choiceHandler = (choice: string) => {
    setHideWood(false);
    setTimeout(() => {
      setChoiceIcons(["wood", "wood", "wood", "33"]);
    }, 2500);
  }

  return (
    <div id="root" className="overflow-hidden">
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
          <div className="w-full flex items-center justify-center">
            <h2 className="text-lg font-bold mb-4 text-muted-foreground">КАМЕНЬ, НОЖНИЦЫ, БУМАГА</h2>
          </div>
          <div className="flex flex-1/3 flex-row items-center justify-around space-x-1 w-[calc(100vw-2rem)] mb-3">
            <div
              onClick={() => choiceHandler("rock")}
              className={`w-[${choiceIcons[3]}%] cursor-pointer text-5xl flex items-center justify-center wood-animation ${hideWood ? 'hide-wood' : ''}`}
              style={{ background: `url(/${choiceIcons[0]}.png) no-repeat center/75%` }}
            >
              <img src="/wood.png" alt="wood" className="w-full h-full cursor-pointer" />
            </div>
            <div
              onClick={() => choiceHandler("scissors")}
              className={`w-[${choiceIcons[3]}%] cursor-pointer text-5xl flex items-center justify-center wood-animation ${hideWood ? 'hide-wood' : ''}`}
              style={{ background: `url(/${choiceIcons[1]}.png) no-repeat center/75%` }}
            >
              <img src="/wood.png" alt="scissors" className="w-full h-full cursor-pointer" />
            </div>
            <div
              onClick={() => choiceHandler("paper")}
              className={`w-[${choiceIcons[3]}%] cursor-pointer text-5xl flex items-center justify-center wood-animation ${hideWood ? 'hide-wood' : ''}`}
              style={{ background: `url(/${choiceIcons[2]}.png) no-repeat center/75%` }}
            >
              <img src="/wood.png" alt="paper" className="w-full h-full cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-min flex flex-column justify-center items-center text-3xl font-bold">
            <button
              onClick={() => {
                setChoiceIcons(["rock", "scissors", "paper", "33"]);
                setHideWood(true);
              }}
              className="w-[calc(100vw-2rem-10rem)] flex items-center justify-center p-2 bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer font-bold rounded-4xl"
            >
              PLAY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}