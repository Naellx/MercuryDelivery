export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  return res.status(200).json({
    success: true,
    project: "Mercury Delivery",
    version: "1.0.0",
    runtime: "delivery-runtime-v1",
    build: "build-v1",
    status: "online"
  });
}
