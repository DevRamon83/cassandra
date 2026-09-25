import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import matchRouter from "./routes/matches.ts";
import "./db.ts";

const app = new Hono();

const env = process.env.NODE_ENV;
const ORIGIN = env === "DEV" ? process.env.ORIGIN_DEV : process.env.ORIGIN_PROD;

app.use(
  "/api/*",
  cors({
    origin: ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  }),
);

app.route("/api", matchRouter);

if (import.meta.main) {
  Deno.serve(app.fetch);
}
