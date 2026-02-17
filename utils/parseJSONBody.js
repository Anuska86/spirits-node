export async function parseJSONBody(req, res) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    throw new Error(`Invalid JSON format: ${error}`);
  }
}
