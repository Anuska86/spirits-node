import http from "node:http";
import path from "node:path";
import fs from "node:fs/promises";

import { serveStatic } from "./utils/serveStatic.js";
import { handleGet, handlePost, handleNews } from "./handlers/routeHandlers.js";

const PORT = 8000;

//console.log("CWD", process.cwd());

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  //API ROUTES

  if (url.startsWith("/api")) {
    if (url === "/api") {
      if (method === "GET") return await handleGet(req, res);
      if (method === "POST") return await handlePost(req, res);

      //If method is not GET or POST

      res.writeHead(405, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Method Not Allowed" }));
    }

    if (url === "/api/news") {
      if (method === "GET") return await handleNews(req, res);

      //If method is not GET for api/news

      res.writeHead(405, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Method Not Allowed" }));
    }

    //If API route doesn't exist

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "API Route Not Found" }));
  }

  //STATIC FILES (HTML, CSS,JS)
  else {
    try {
      return await serveStatic(req, res, __dirname);
    } catch (error) {
      const path404 = path.join(__dirname, "public", "404.html");
      const content = await fs.readFile(path404, "utf-8");

      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end(content);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
});
