import { Hono } from "hono";
import { cors } from "hono/cors";
import matchRouter from "./routes/matches.ts";
import authRouter from "./routes/auth.ts";
import "./db.ts";
import betsRoute from "./routes/bets.ts";

const app = new Hono();

const env = Bun.env.NODE_ENV;
const ORIGIN = env === "DEV" ? Bun.env.ORIGIN_DEV : Bun.env.ORIGIN_PROD;

app.use(
  "/api/*",
  cors({
    origin: ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  }),
);

app.route("/api", matchRouter);
app.route("/api", authRouter);
app.route("/api", betsRoute);

export default {
  port: Bun.env.PORT || 3000,
  fetch: app.fetch,
};
