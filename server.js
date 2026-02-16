import http from "node:http";

import { serveStatic } from "./utils/serveStatic.js";
import { getData } from "./utils/getData.js";

const PORT = 8000;

//console.log("CWD", process.cwd());

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (condition) {
  } else if (!req.url.startsWith("/api")) {
    return await await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
