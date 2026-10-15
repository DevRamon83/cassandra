import { Context } from "@hono/hono";
import { verify } from "argon2";
import { client } from "../db.ts";
import { findUserQuery } from "../queries/findUserQuery.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors } from "../../shared/index.ts";
import { newCookies } from "../services/newCookies.ts";

export const login = async (c: Context) => {
  try {
    const { username, psw } = c.get("updateData");
    const { text, value } = findUserQuery(username);
    const { rows } = await client.query(text, value);

    if (rows.length === 0)
      return handleErrorResponse(c, errors.user404, 404, false);

    const match = await verify(rows[0].psw, psw);

    if (!match) return handleErrorResponse(c, errors.wrongPsw, 400, false);

    const createdCookies = await newCookies(c, username, rows[0].id);

    if (!createdCookies)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    return c.json({ error: false, username }, 200);
  } catch (err) {
    const error = err as Error;
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
