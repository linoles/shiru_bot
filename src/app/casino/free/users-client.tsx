'use client'

import { useEffect, useRef, useState } from 'react'
import "@/src/app/globals.css";
import Image from 'next/image';
import { CasinoProps, Points_from } from '../../users-client';

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
  let [int, setInt] = useState(rand_choices.map((choice, index) => (<div key={index} className={`h-[30vw] w-[30vw] bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`/${choice}.png`} className="w-[60%]"></img></div>)));

  useEffect(() => {
    try {
      const tg = window.Telegram.WebApp;
      if (!tg) return;
      setTgData(tg.initDataUnsafe?.user);
      tg.BackButton.onClick(() => location.href = "/casino");
      tg.BackButton.show();
      const me = users.find(user => user.tgId === 7441988500);
      console.info(Date.now());
      if (!me) return;
      if (!me.freeCasinoNow && me.lastFreeCasino + 7200000 <= Date.now()) {
        const mb = tg.MainButton;
        mb.enable();
        mb.setParams({ text: "Начать игру 🕹" });
        mb.onClick(() => {
          mb.disable();
          mb.hide();
          const sb = tg.SecondaryButton;
          sb.enable();
          sb.setParams({ text: "Крутить 🎰" });
          sb.onClick(async () => {
            setInt(rand_choices.map((choice, index) => (<div key={index} className={`h-[30vw] w-full bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`/${choice}.png`} className="w-[60%]"></img></div>)));
            tg.SecondaryButton.disable();
            await new Promise(resolve => setTimeout(resolve, 2000));
            const newRandChoices = [symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)]];
            setInt(newRandChoices.map((choice, index) => (<div key={index} className={`h-[30vw] w-full bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`/${choice}.png`} className="w-[60%]"></img></div>)));
            tg.SecondaryButton.enable();
            const curUser = users.find(u => u.tgId === window.Telegram?.WebApp.initDataUnsafe?.user.id);
            if (!curUser) return;
            if (curUser.freeCasinoProps.done >= 3) return;
            const payout = payouts[newRandChoices.join('')];
            curUser.freeCasinoProps.points += payout;
            curUser.freeCasinoProps.done += 1;
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
            const result = await response.json();
            setCurUser(curUser);
            setUsers(prev => prev.map(u => u.tgId === curUser.tgId ? curUser : u));
          });
          sb.show();
          me.freeCasinoNow = true;
          me.lastFreeCasino = Date.now();
          const response = fetch('/api/save-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(me)
          });
        });
        mb.show();
      }
      if (!me.freeCasinoNow) return;
      const sb = tg.SecondaryButton;
      sb.enable();
      sb.setParams({ text: "Крутить 🎰" });
      sb.onClick(async () => {
        setInt(rand_choices.map((choice, index) => (<div key={index} className={`h-[30vw] w-full bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`/${choice}.png`} className="w-[60%]"></img></div>)));
        sb.disable();
        await new Promise(resolve => setTimeout(resolve, 2000));
        const newRandChoices = [symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)]];
        setInt(newRandChoices.map((choice, index) => (<div key={index} className={`h-[30vw] w-full bg-card rounded-3xl text-5xl flex items-center justify-center ${choice}`}><img src={`/${choice}.png`} className="w-[60%]"></img></div>)));
        sb.enable();
        const curUser = users.find(u => u.tgId === window.Telegram?.WebApp.initDataUnsafe?.user.id);
        if (!curUser) return;
        if (curUser.freeCasinoProps.done >= 3) return;
        const payout = payouts[newRandChoices.join('')];
        curUser.freeCasinoProps.points += payout;
        curUser.freeCasinoProps.done += 1;
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
        const result = await response.json();
        setCurUser(curUser);
        setUsers(prev => prev.map(u => u.tgId === curUser.tgId ? curUser : u));
      });
      sb.show();
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
            points: 0,
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

  const getRemainTime = (users: User[]) => {
    const me = users.find(user => user.tgId === 7441988500);
    if (me) {
      const remainTime = Math.max(0, me.lastFreeCasino + 300000 - Date.now()) / 1000;
      const minutes = Math.floor(remainTime / 60);
      const seconds = Math.floor(remainTime % 60);
      return `${minutes}m ${seconds}s`;
    } else {
      return 0;
    }
  }

  

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
              <span className="text-foreground neumorph-glow"><b>SHIRU</b></span>
              <span className="text-primary ml-1 green-neumorph-glow"><b>BOT</b></span>
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
          <div className="flex items-center justify-center w-full h-12">
            <span className="text-sm text-muted-foreground mr-2 py-3 px-2 bg-card rounded-xl max-w-[80vw] overflow-hidden text-ellipsis whitespace-nowrap border border-border">{`https://t.me/ShiruChatBot/ShiruApp/casino/free/vklnvclkkzvnlcxnvxnj`}...</span>
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full min-w-[48px]">
              <Image src="/copy.png" alt="copy" className="w-6 h-6" width={24} height={24} />
            </div>
          </div>
          <div className="w-full max-w-xs mx-auto p-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-screen px-3">
              <div className="flex w-full mx-4 space-x-3">
                {int}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground py-3 px-2 bg-card rounded-2xl w-full border border-border flex flex-row items-center justify-between">
            <div className="text-center text-lg flex flex-col items-center justify-center border-r-2 border-border w-[33%] h-full font-bold">{users.filter(user => user.freeCasinoProps.done > 0).length} 👥</div>
            <div className="text-center text-lg flex flex-col items-center justify-center border-r-2 border-border w-[33%] h-full font-bold">{curUser.freeCasinoProps.points} 🍀</div>
            <div className="text-center text-lg flex flex-column items-center justify-center w-[33%] h-full font-bold">{getRemainTime(users)} ⏳</div>
          </div>
        </div>
      </div>
    </div>
  )
}