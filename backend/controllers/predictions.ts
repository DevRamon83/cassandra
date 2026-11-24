import type { Context } from "hono";
import { errors, leagues } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { getStats } from "../helpers/getStats.ts";
import { getPredictions } from "../helpers/getPredictions.ts";
import { predictionQuery } from "../queries/predictionsQuery.ts";
import { client } from "../db.ts";
import type { TeamsMap } from "../typings/atomics.ts";

export const predictions = async (c: Context) => {
  try {
    const teamsMap: TeamsMap = new Map();

    const stats = await getStats(teamsMap, leagues);

    if (!stats || stats.error || !stats.map)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    const predictions = getPredictions(stats.map);

    if (!predictions)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    const cleanPredictions = predictions.filter((obj) => obj.prediction);

    if (cleanPredictions.length === 0) {
      return c.json({ error: false, message: "Success" }, 200);
    }

    const query = predictionQuery(cleanPredictions);

    if (!query)
      return handleErrorResponse(c, errors.invalidStandard, 400, false);

    await client.query(query.text, query.values);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
