import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

const PORT = 8000;

console.log("CWD", process.cwd());

const __dirname = import.meta.dirname;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><h1>The server is working</h1></html>");
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});

serveStatic(__dirname);
