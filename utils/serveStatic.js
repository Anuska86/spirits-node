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
  } catch (error) {
    if (error.code === "ENOENT") {
      const content = await fs.readFile(path.join(publicDirectory, "404.html"));
      sendResponse(res, 404, "text/html", content);
    } else {
      sendResponse(
        res,
        500,
        "text/html",
        `<html><h1>Server Error: ${error.code}</h1></html>`,
      );
    }
  }
}
