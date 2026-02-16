import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

import { handleGet } from "./handlers/routeHandlers.js";

const PORT = 8000;

//console.log("CWD", process.cwd());

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api") {
    if (req.method === "GET") {
      return await handleGet(req, res);
    }
  } else if (!req.url.startsWith("/api")) {
    return await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
