import type { Context } from "hono";
import { getUserWithBankroll } from "../services/getUserWithBankroll";
import { handleErrorResponse } from "../helpers/handleErrorResponse";
import { errors, type User } from "../../shared";

export const checkAuth = async (c: Context) => {
  const tokensData = c.get("tokensData");

  try {
    const userRow = await getUserWithBankroll(tokensData.username);

    if (!userRow) {
      return handleErrorResponse(c, errors.user404, 404, false);
    }

    const { id, bankroll_id, initial_budget, current_budget, season } = userRow;

    const res: User = {
      username: tokensData.username,
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
