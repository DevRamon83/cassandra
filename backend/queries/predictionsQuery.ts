import { predictionsArray, type PredictionData } from "../../shared/index.ts";
import { getPlaceholder } from "../helpers/getPlaceholder.ts";
import { getUpdateCondition } from "../helpers/queriesConditions.ts";

const preparePredictionsData = (predictions: PredictionData[]) => {
  const matrix = [];

  for (let i = 0; i < predictions.length; i++) {
    const data = predictions[i];
    const {
      match_id,
      prediction,
      prediction_result,
      prediction_accuracy,
      settled_at,
    } = data;

    matrix.push([
      Number(match_id),
      prediction,
      prediction_result,
      prediction_accuracy,
      settled_at,
    ]);
  }
  return matrix;
};

export const predictionQuery = (predictions: PredictionData[]) => {
  const data = preparePredictionsData(predictions);

  if (data.length === 0) return null;

  const placeholders = getPlaceholder(data);

  const sqlQuery = `
  INSERT INTO predictions (${predictionsArray.join(", ")}) 
  VALUES ${placeholders}
  ON CONFLICT (match_id) DO NOTHING;
`;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};
