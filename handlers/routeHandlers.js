import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";

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
    await addNewSighting(parsedBody);
    sendResponse(res, 201, "application/json", JSON.stringify(parsedBody));
  } catch (error) {
    sendResponse(
      res,
      400,
      "application/json",
      JSON.stringify({ error: error }),
    );
  }
}
