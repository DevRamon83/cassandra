import type { Context } from "hono";
import { client } from "../db.ts";
import { errors } from "../../shared/index.ts";
import { getPredictionsToUpdateQuery } from "../queries/getPredictionsToUpdateQuery.ts";
import { getPredictionsMatrix } from "../helpers/getPredictionsMatrix.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { updatePredictionsQuery } from "../queries/updatePredictionQuery.ts";
import type { PredictionMatrix } from "../typings/atomics.ts";

export const updatePredictions = async (c: Context) => {
  try {
    const query = getPredictionsToUpdateQuery();
    if (!query)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    const { rows } = await client.query(query.text, query.values);

    if (rows.length === 0)
      return handleErrorResponse(c, errors.zeroUpdate, 400, true);

    const matrix: PredictionMatrix | null = await getPredictionsMatrix(rows);

    if (!matrix)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    const queryForUpdate = updatePredictionsQuery(matrix);

    if (!queryForUpdate) {
      return handleErrorResponse(c, errors.invalidStandard, 400, true);
    }

    await client.query(queryForUpdate.text, queryForUpdate.values);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
