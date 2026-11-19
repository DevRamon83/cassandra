import { Hono } from "hono";
import { tokensValidator } from "../middlewares/tokensValidator";
import { rotateToken } from "../middlewares/rotateTokens";
import { adminOnly } from "../middlewares/adminOnly";
import { leagueSeasonValidator } from "../middlewares/leagueSeasonValidator";
import { predictions } from "../controllers/predictions";
import { allPredictions } from "../controllers/allPredictions";
import { bankroll } from "../controllers/bankroll";

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

betsRoute.post("/bankroll", tokensValidator, rotateToken, bankroll);

export default betsRoute;
