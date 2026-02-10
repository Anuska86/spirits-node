import path from "node:path";
import fs from "node:fs/promises";

import { sendResponse } from "./sendResponse.js";

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

export async function serveStatic(req, res, baseDirectory) {
  const relativePath = req.url === "/" ? "index.html" : req.url;
  const filePath = path.join(baseDirectory, "public", relativePath);

  console.log(
    `DEBUG: Browser asked for ${req.url} -> Node is looking at: ${filePath}`,
  );

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, contentType, content);

    console.log(`Served: ${relativePath} as ${contentType}`);
  } catch (error) {
    console.log("File not found:", relativePath);
    sendResponse(res, 404, "text/plain", "404 Not Found");
  }
}
