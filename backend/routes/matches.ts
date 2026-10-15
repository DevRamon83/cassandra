import { Hono } from "@hono/hono";
import { updateSeason } from "../controllers/updateSeason.ts";
import { allMatches } from "../controllers/allMatches.ts";
import { override } from "../controllers/override.ts";
import { updateValidator } from "../middlewares/updateValidator.ts";
import { overrideValidator } from "../middlewares/overrideValidator.ts";

const matchRouter = new Hono();

matchRouter.post("/update", updateValidator, updateSeason);
matchRouter.get("/leagueData", allMatches);
matchRouter.post("/override", updateValidator, overrideValidator, override);

export default matchRouter;
