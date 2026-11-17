import { Hono } from "hono";
import { tokensValidator } from "../middlewares/tokensValidator";
import { rotateToken } from "../middlewares/rotateTokens";
import { adminOnly } from "../middlewares/adminOnly";
import { leagueSeasonValidator } from "../middlewares/leagueSeasonValidator";
import { predictions } from "../controllers/predictions";
import { allPredictions } from "../controllers/allPredictions";

const betsRoute = new Hono();

betsRoute.post(
  "/predictions",
  tokensValidator,
  rotateToken,
  adminOnly,
  leagueSeasonValidator,
  predictions,
);

betsRoute.get(
  "/predictions",
  tokensValidator,
  rotateToken,
  adminOnly,
  allPredictions,
);

export default betsRoute;
