import { Hono } from "@hono/hono";
import { updateSeason } from "../controllers/updateSeason.ts";
import { allMatches } from "../controllers/allMatches.ts";

const matchRouter = new Hono();

matchRouter.post("/update", updateSeason);
matchRouter.get("/leagueData", allMatches);

export default matchRouter;
