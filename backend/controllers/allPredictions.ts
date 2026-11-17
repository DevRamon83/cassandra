import type { Context } from "hono";
import { errors } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { client } from "../db.ts";
import { getPredictionsQuery } from "../queries/getPredictionsQuery.ts";

export const allPredictions = async (c: Context) => {
  try {
    const query = getPredictionsQuery();

    if (!query)
      return handleErrorResponse(c, errors.invalidStandard, 400, false);

    const { rows } = await client.query(query.text, query.values);

    return c.json({ error: false, data: rows }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
