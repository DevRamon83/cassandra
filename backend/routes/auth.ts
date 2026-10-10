import { Hono } from "@hono/hono";

const authRouter = new Hono();

authRouter.post("/login");
authRouter.post("/signup");
authRouter.post("/logout");

export default authRouter;
