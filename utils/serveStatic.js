import path from "node:path";

export function serveStatic(baseDirectory) {
  const filePath = path.join(baseDirectory, "public", "index.html");

  console.log("This is the file path:", filePath);
}
