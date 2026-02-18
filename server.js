import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

import { handleGet, handlePost, handleNews } from "./handlers/routeHandlers.js";

const PORT = 8000;

//console.log("CWD", process.cwd());

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  // Check if it's an API route
  if (req.url.startsWith("/api")) {
    if (req.url === "/api") {
      if (req.method === "GET") {
        return await handleGet(req, res);
      } else if (req.method === "POST") {
        return await handlePost(req, res);
      }
    } else if (req.url === "/api/news") {
      return await handleNews(req, res);
    }

    // ERROR HANDLING: If the code reaches here, the /api/xxxx was not found
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "Not Found",
        message: `the route ${req.url} does not exist on this server.`,
      }),
    );
  } else {
    // This handles all non-api routes (HTML, CSS, JS files)
    return await serveStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
