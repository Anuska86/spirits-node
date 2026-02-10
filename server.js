import http from "node:http";

import { serveStatic } from "./utils/serveStatic.js";

const PORT = 8000;

console.log("CWD", process.cwd());

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api") {
    const data = { message: "Hello from the server!" };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
    return;
  }

  await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
