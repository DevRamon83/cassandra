import { useMemo } from "react";
import { classes } from "../../../constants/classes";
import ChartPanel from "../../../ui/ChartPanel";
import type { PredictionUI } from "../../../typings/interfaces";

interface Props {
  allPredictions: PredictionUI[];
  league: string;
  market: string;
  predictionMarket: string;
}

export default function PredictionsChart({
  allPredictions,
  league,
  market,
  predictionMarket,
}: Props) {
  const { stats } = classes;

  const predictions = useMemo(() => {
    let length = 0;
    let won = 0;

    for (const pick of allPredictions) {
      if (pick.prediction_result === null || pick.prediction === null) continue;
      if (league !== "all" && pick.league !== league) continue;
      if (predictionMarket !== "all" && pick.prediction !== predictionMarket)
        continue;

      length++;
      if (pick.prediction_result) won++;
    }

    return { length, won };
  }, [allPredictions, predictionMarket, league]);

  const { won, length } = predictions;
  const wonPercentage = Math.round((won / length) * 100);

  return (
    <div className={stats.predictionsContainer}>
      {Number.isNaN(wonPercentage) ? (
        <div>There is no prediction for this market</div>
      ) : (
        <>
          <h4>
            {`Based on ${length} ${length === 1 ? "prediction" : "predictions"}`}
          </h4>
          <ChartPanel
            market={market}
            percentage={wonPercentage}
            caller="predictions"
          />
        </>
      )}
    </div>
  );
}
