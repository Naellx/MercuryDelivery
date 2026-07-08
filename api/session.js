import { redis } from "../lib/redis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  const token = crypto.randomUUID();

  await redis.set(`session:${token}`, "valid", {
    ex: 30
  });

  return res.status(200).json({
    success: true,
    session_token: token,
    expires_in: 30
  });
}
