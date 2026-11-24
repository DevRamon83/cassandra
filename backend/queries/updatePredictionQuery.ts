import { getPlaceholder } from "../helpers/getPlaceholder";
import type { PredictionMatrix } from "../typings/atomics";

export const updatePredictionsQuery = (matrix: PredictionMatrix) => {
  const placeholders = getPlaceholder(matrix);

  const sqlQuery = `
    UPDATE predictions AS p
    SET
      prediction_result = v.prediction_result::boolean
    FROM (VALUES
      ${placeholders}
    ) AS v(prediction_result, id)
    WHERE p.id = v.id::bigint;
  `;

  return {
    text: sqlQuery,
    values: matrix.flat(),
  };
};
