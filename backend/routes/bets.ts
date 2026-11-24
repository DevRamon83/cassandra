import { Hono } from "hono";
import { tokensValidator } from "../middlewares/tokensValidator";
import { rotateToken } from "../middlewares/rotateTokens";
import { adminOnly } from "../middlewares/adminOnly";
import { predictions } from "../controllers/predictions";
import { allPredictions } from "../controllers/allPredictions";
import { bankroll } from "../controllers/bankroll";
import { betValidator } from "../middlewares/betValidator";
import { newBet } from "../controllers/newBet";
import { myBets } from "../controllers/myBets";
import { updatePredictions } from "../controllers/updatePredictions";

const betsRoute = new Hono();

betsRoute.post(
  "/predictions",
  tokensValidator,
  rotateToken,
  adminOnly,
  predictions,
);

betsRoute.get(
  "/predictions",
  tokensValidator,
  rotateToken,
  adminOnly,
  allPredictions,
);

betsRoute.post(
  "/outcomes",
  tokensValidator,
  rotateToken,
  adminOnly,
  updatePredictions,
);

betsRoute.post("/bankroll", tokensValidator, rotateToken, bankroll);
betsRoute.post("/new", tokensValidator, rotateToken, betValidator, newBet);
betsRoute.get("/myBets", tokensValidator, rotateToken, myBets);

export default betsRoute;
