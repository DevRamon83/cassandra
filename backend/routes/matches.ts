import { Hono } from "hono";
import { updateSeason } from "../controllers/updateSeason.ts";
import { allMatches } from "../controllers/allMatches.ts";
import { override } from "../controllers/override.ts";
import { updateValidator } from "../middlewares/updateValidator.ts";
import { overrideValidator } from "../middlewares/overrideValidator.ts";
import { tokensValidator } from "../middlewares/tokensValidator.ts";
import { rotateToken } from "../middlewares/rotateTokens.ts";
import { adminOnly } from "../middlewares/adminOnly.ts";

const matchRouter = new Hono();

matchRouter.post(
  "/update",
  tokensValidator,
  rotateToken,
  adminOnly,
  updateValidator,
  updateSeason,
);
matchRouter.get("/leagueData", allMatches);
matchRouter.post(
  "/override",
  tokensValidator,
  rotateToken,
  adminOnly,
  updateValidator,
  overrideValidator,
  override,
);

export default matchRouter;
