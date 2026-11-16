import { Hono } from "hono";
import { updateSeason } from "../controllers/updateSeason.ts";
import { allMatches } from "../controllers/allMatches.ts";
import { leagueSeasonValidator } from "../middlewares/leagueSeasonValidator.ts";
import { tokensValidator } from "../middlewares/tokensValidator.ts";
import { rotateToken } from "../middlewares/rotateTokens.ts";
import { adminOnly } from "../middlewares/adminOnly.ts";
import { updateMatch } from "../controllers/updateMatch.ts";
import { matchValidator } from "../middlewares/matchValidator.ts";
import { refreshCache } from "../controllers/refreshCache.ts";
import { updateDate } from "../controllers/updateDate.ts";

const matchRouter = new Hono();

matchRouter.post(
  "/update_season",
  tokensValidator,
  rotateToken,
  adminOnly,
  leagueSeasonValidator,
  updateSeason,
);
matchRouter.get("/league_data", allMatches);
matchRouter.post(
  "/refresh_cache",
  tokensValidator,
  rotateToken,
  adminOnly,
  leagueSeasonValidator,
  refreshCache,
);

matchRouter.patch(
  "/match",
  tokensValidator,
  rotateToken,
  adminOnly,
  matchValidator,
  updateMatch,
);

matchRouter.patch("/date", tokensValidator, rotateToken, adminOnly, updateDate);

export default matchRouter;
