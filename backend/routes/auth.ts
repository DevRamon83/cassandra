import { Hono } from "@hono/hono";
import { authValidator } from "../middlewares/authValidator.ts";
import { signup } from "../controllers/signup.ts";
import { logout } from "../controllers/logout.ts";
import { login } from "../controllers/login.ts";
import { tokensValidator } from "../middlewares/tokensValidator.ts";
import { rotateToken } from "../middlewares/rotateTokens.ts";
import { checkAuth } from "../controllers/checkAuth.ts";

const authRouter = new Hono();

authRouter.post("/login", authValidator, login);
authRouter.post("/signup", authValidator, signup);
authRouter.get("/logout", logout);
authRouter.get("/check", tokensValidator, rotateToken, checkAuth);

export default authRouter;
