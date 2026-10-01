import { Hono } from "@hono/hono";
import { updateSeason } from "../controllers/updateSeason.ts";

const matchRouter = new Hono();

matchRouter.post("/update", updateSeason);

export default matchRouter;
