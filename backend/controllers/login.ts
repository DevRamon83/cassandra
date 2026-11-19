import type { Context } from "hono";
import { verify } from "argon2";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors, type User } from "../../shared/index.ts";
import { newCookies } from "../services/newCookies.ts";
import { getUserWithBankroll } from "../services/getUserWithBankroll.ts";

export const login = async (c: Context) => {
  try {
    const { username, psw } = c.get("auth");
    const userRow = await getUserWithBankroll(username);

    if (!userRow) {
      return handleErrorResponse(c, errors.user404, 404, false);
    }

    const match = await verify(userRow.psw, psw);

    if (!match) return handleErrorResponse(c, errors.wrongPsw, 400, false);

    const createdCookies = await newCookies(c, username, userRow.id);

    if (!createdCookies)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    const { id, bankroll_id, initial_budget, current_budget, season } = userRow;

    const res: User = {
      username,
      id,
      bankroll_id,
      initial_budget,
      current_budget,
      season,
    };

    return c.json({ error: false, data: res }, 200);
  } catch (err) {
    const error = err as Error;
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
