import { Hono } from "@hono/hono";
import { createMatch } from "../controllers/createMatch.ts";
import { newSeason } from "../controllers/newSeason.ts";

const matchRouter = new Hono();

matchRouter.post("/newMatch", createMatch);
matchRouter.post("/newSeason", newSeason);

export default matchRouter;
