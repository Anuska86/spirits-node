import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";

import { stories } from "../data/stories.js";

// handleGet

export async function handleGet(req, res) {
  const data = await getData();
  const content = JSON.stringify(data);
  sendResponse(res, 200, "application/json", content);
}

// handlePost

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req, res);
    const sanitizedBody = sanitizeInput(parsedBody);
    await addNewSighting(sanitizedBody);
    sightingEvents.emit("sighting-added", sanitizedBody);

    sendResponse(res, 201, "application/json", JSON.stringify(sanitizedBody));
  } catch (error) {
    sendResponse(
      res,
      400,
      "application/json",
      JSON.stringify({ error: error }),
    );
  }
}

// handleNews

export async function handleNews(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length);

    res.write(
      `data: ${JSON.stringify({
        event: "news-update",
        story: stories[randomIndex],
      })}\n\n`,
    );
    console.log(res);
  }, 5000);
}
