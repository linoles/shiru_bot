// src/app/api/getAllUsers/route.ts
import { NextResponse } from 'next/server';
import db from '@/src/app/db'; // Проверьте экспорт `db` в db.ts

export const dynamic = 'force-dynamic'; // Отключаем кеширование

export async function POST() {
  try {
    const users = await new Promise((resolve, reject) => {
      db.all("SELECT tgId, tgNick, tgUsername FROM users_data", (error, result) => {
        if (error) reject(error);
        resolve(result || []);
      });
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Database error" }, // Не возвращайте `error` напрямую (риск утечки данных)
      { status: 500 }
    );
  }
}