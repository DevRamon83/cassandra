import { Hono } from "@hono/hono";
import { updateSeason } from "../controllers/updateSeason.ts";
import { allMatches } from "../controllers/allMatches.ts";
import { updateValidator } from "../middlewares/updateValidator.ts";

const matchRouter = new Hono();

matchRouter.post("/update", updateValidator, updateSeason);
matchRouter.get("/leagueData", allMatches);

export default matchRouter;
