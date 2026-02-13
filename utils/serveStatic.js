import path from "node:path";
import fs from "node:fs/promises";

import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDirectory) {
  const publicDirectory = path.join(baseDirectory, "public");
  const filePath = path.join(
    publicDirectory,
    req.url === "/" ? "index.html" : req.url,
  );

  const extension = path.extensionName(filePath);

  const contentType = getContentType(extension);

  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, contentType, content);

    console.log(`Served: ${relativePath} as ${contentType}`);
  } catch (error) {
    console.log("File not found:", relativePath);
    sendResponse(res, 404, "text/plain", "404 Not Found");
  }
}
