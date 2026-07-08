import fs from "fs";
import path from "path";
import { sessions } from "./session.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  const { session_token } = req.body || {};

  if (!session_token || !sessions.has(session_token)) {
    return res.status(403).json({
      success: false,
      message: "Invalid session"
    });
  }

  sessions.delete(session_token);

  const filePath = path.join(process.cwd(), "scripts", "Main.lua");
  const payload = fs.readFileSync(filePath, "utf8");

  return res.status(200).json({
    success: true,
    runtime_payload: payload,
    build_version: "delivery-build-v1",
    runtime_format_version: "runtime-v1"
  });
}
