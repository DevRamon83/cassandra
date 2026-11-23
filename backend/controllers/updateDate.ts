import type { Context } from "hono";
import { client } from "../db.ts";
import { errors, scopes } from "../../shared/index.ts";
import { getBody } from "../helpers/getBody.ts";
import { validIds } from "../helpers/matchValidators.ts";
import { getUpdatedMatchTime } from "../helpers/getMatchData.ts";
import { updateDateQuery } from "../queries/updateDateQuery.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";

export const updateDate = async (c: Context) => {
  try {
    const body = await getBody(c);
    const status = { success: true, error: "" };

    const scope = scopes.backend.updateDate;
    if (!validIds([body.id], status, scope))
      return handleErrorResponse(c, "invalidId", 400, true);

    if (!body.match_date)
      return handleErrorResponse(c, "missingDate", 400, true);

    const date = getUpdatedMatchTime(body.match_date);

    if (!date) return handleErrorResponse(c, "invalidDate", 400, true);
    const id = Number(body.id);

    const query = updateDateQuery(id, date);

    if (!query) {
      return c.json({ error: true, errorMsg: errors.invalidStandard }, 500);
    }

    await client.query(query.text, query.values);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
