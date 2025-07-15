// src/app/api/getAllUsers/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json([{ tgId: 1, tgNick: "test", tgUsername: "test" }]);
}