import { useState } from "react";
import type { PredictionUI } from "../../typings/interfaces";
import { classes } from "../../constants/classes";
import PredictionCards from "../../ui/PredictionCards";
import PredictionsMainMenu from "../../ui/PredictionsMainMenu";

interface Props {
  predictions: PredictionUI[];
}

export default function ShowPredictions({ predictions }: Props) {
  const [tab, setTab] = useState("current");
  const historyPredictions: PredictionUI[] = [];
  const currentPredictions: PredictionUI[] = [];

  predictions.forEach((prediction) => {
    if (prediction.prediction_result === null) {
      currentPredictions.push(prediction);
    } else {
      historyPredictions.push(prediction);
    }
  });

  const mapArray = tab === "current" ? currentPredictions : historyPredictions;

  return (
    <>
      <PredictionsMainMenu tab={tab} setTab={setTab} />

      {tab === "current" ? (
        <div className={classes.predictions.cards}>
          <PredictionCards mapArray={mapArray} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
