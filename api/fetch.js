import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const filePath = path.join(process.cwd(), "scripts", "Main.lua");
    const payload = fs.readFileSync(filePath, "utf8");

    return res.status(200).json({
      success: true,
      runtime_payload: payload,
      build_version: "v1"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Main.lua not found"
    });
  }
}
