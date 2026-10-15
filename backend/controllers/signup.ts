import { Context } from "@hono/hono";
import { hash } from "argon2";
import { authQuery } from "../queries/authQuery.ts";
import { client } from "../db.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors } from "../../shared/index.ts";
import { newCookies } from "../services/newCookies.ts";

export const signup = async (c: Context) => {
  try {
    const { username, psw } = c.get("updateData");
    const hashPsw = await hash(psw);
    const query = authQuery(username, hashPsw);

    const resp = await client.query(query.text, query.values);

    if (resp.rowCount === 0)
      return handleErrorResponse(c, errors.userExists, 400, false);

    const createdCookies = await newCookies(c, username, resp.rows[0].id);

    if (!createdCookies)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    return c.json({ error: false, username }, 200);
  } catch (err) {
    const error = err as Error;
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
