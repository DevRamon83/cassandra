import { Context } from "@hono/hono";

export async function getBody(c: Context) {
  try {
    const body = await c.req.json();
    return body;
  } catch {
    return null;
  }
}
