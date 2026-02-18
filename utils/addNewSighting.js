import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";

import { getData } from "./getData.js";

export async function addNewSighting(newSighting) {
  try {
    const sightings = await getData();

    const sightingWithId = {
      id: crypto.randomUUID(),
      ...newSighting,
    };

    sightings.push(sightingWithId);

    const pathJSON = path.join("data", "data.json");

    await fs.writeFile(pathJSON, JSON.stringify(sightings, null, 2), "utf8");

    return sightingWithId;
  } catch (error) {
    throw new Error("Error catching new sights:", error);
  }
}
