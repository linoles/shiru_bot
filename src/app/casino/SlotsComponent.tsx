"use client";

import { useState, useRef, useEffect } from 'react';

const TelegramSlots = () => {
  const symbols = ['🍇', '🍋', 'BAR', '7️⃣'];

  const rand_choices = [symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)], symbols[Math.floor(Math.random() * 4)]];

  const payouts = {
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

  return (
    <div className="w-full max-w-xs mx-auto p-4 flex items-center justify-center">
      {
        rand_choices.map((choice, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <video src={`/casino_choices/${choice}.mp4`} autoPlay>{choice}</video>
          </div>
        ))
      }
    </div>
  );
};

export default TelegramSlots;