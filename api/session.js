import crypto from "crypto";
import { redis } from "../lib/redis";

export default async function handler(req, res) {
  try {
    const token = crypto.randomUUID();

    await redis.set(`session:${token}`, "valid", { ex: 30 });

    return res.status(200).json({
      success: true,
      session_token: token
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: String(err),
      stack: err.stack
    });
  }
}
