import type { Context } from "hono";
import { errors } from "../../shared/index.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { getStats } from "../helpers/getStats.ts";
import { getPredictions } from "../helpers/getPredictions.ts";
import { predictionQuery } from "../queries/predictionsQuery.ts";
import { client } from "../db.ts";

export const predictions = async (c: Context) => {
  try {
    const body = c.get("leagueData");
    const { league, season } = body;
    if (!league || !season)
      return handleErrorResponse(c, errors.bodyMissing, 400, true);

    const stats = await getStats(league, season);

    if (stats.error || !stats.map || !stats.roundToPredict)
      return handleErrorResponse(c, errors.invalidStandard, 400, true);

    const predictions = getPredictions(stats);
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
