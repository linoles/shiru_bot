import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

export interface User {
  tgId: number;
  tgNick: string;
  tgUsername: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.info('ok');
  db.all("SELECT tgId, tgNick, tgUsername FROM users_data", (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!result.length) {
      return res.status(404).json({ error: "No users found" });
    }
    return res.status(200).json(
      result.map((user) => ({
        tgId: (user as any).tgId,
        tgNick: (user as any).tgNick,
        tgUsername: (user as any).tgUsername,
      }))
    );
  });
}
