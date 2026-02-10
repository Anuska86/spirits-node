import path from "node:path";

export function serveStatic(__dirname) {
  const filePath = path.join(__dirname, "public", "index.html");

  console.log(filePath);
}
