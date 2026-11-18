import { predictionsArray } from "../../shared/index.ts";
import type { MatchPrediction } from "../../shared/typings/atomics.ts";
import { getPlaceholder } from "../helpers/getPlaceholder.ts";
import { getUpdateCondition } from "../helpers/queriesConditions.ts";

const preparePredictionsData = (predictions: MatchPrediction[]) => {
  const matrix = [];

  for (let i = 0; i < predictions.length; i++) {
    const data = predictions[i];
    const { match_id, prediction, prediction_result, prediction_accuracy } =
      data;

    matrix.push([
      Number(match_id),
      prediction,
      prediction_result,
      prediction_accuracy,
    ]);
  }
  return matrix;
};

export const predictionQuery = (predictions: MatchPrediction[]) => {
  const data = preparePredictionsData(predictions);

  if (data.length === 0) return null;

  const placeholders = getPlaceholder(data);

  const sqlQuery = `
    INSERT INTO predictions (${predictionsArray.join(", ")}) 
    VALUES ${placeholders}
    ON CONFLICT (match_id) 
    DO UPDATE SET
      ${getUpdateCondition("predictions", "prediction")},
      ${getUpdateCondition("predictions", "prediction_result")},
      ${getUpdateCondition("predictions", "prediction_accuracy")};
  `;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};
