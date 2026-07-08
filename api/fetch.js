import fs from "fs";
import path from "path";
import { redis } from "../lib/redis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  const { session_token } = req.body || {};

  if (!session_token) {
    return res.status(400).json({
      success: false,
      message: "Missing session token"
    });
  }

  const exists = await redis.get(`session:${session_token}`);

  if (!exists) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired session"
    });
  }

  // Hapus token agar hanya bisa dipakai sekali
  await redis.del(`session:${session_token}`);

  const filePath = path.join(process.cwd(), "scripts", "Main.lua");
  const payload = fs.readFileSync(filePath, "utf8");

  return res.status(200).json({
    success: true,
    runtime_payload: payload,
    build_version: "delivery-build-v1",
    runtime_format_version: "runtime-v1"
  });
}
