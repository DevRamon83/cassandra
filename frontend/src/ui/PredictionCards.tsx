import { useState } from "react";
import { classes } from "../constants/classes";
import { getMatchDate } from "../helpers/getLeagueData";
import type { PredictionUI } from "../typings/interfaces";
import Reliability from "./Reliability";
import PredictionRow from "./PredictionRow";

interface Props {
  mapArray: PredictionUI[];
}

export default function PredictionCards({ mapArray }: Props) {
  const [reliability, setReliability] = useState("reliability");

  const filteredPredictions =
    reliability === "reliability"
      ? mapArray
      : mapArray.filter((p) => p.prediction_accuracy === reliability);

  return (
    <>
      <div className={classes.predictions.reliability}>
        <Reliability setReliability={setReliability} />
      </div>
      {filteredPredictions.length === 0 ? (
        <h4>No predictions yet. Check back later!</h4>
      ) : (
        filteredPredictions.map((prediction) => (
          <div className={classes.predictions.card} key={prediction.id}>
            <h4>{prediction.match}</h4>
            <h5>{getMatchDate(prediction.date).matchDate}</h5>
            <PredictionRow
              accuracy={prediction.prediction_accuracy}
              prediction={prediction.prediction}
              league={prediction.league}
            />
          </div>
        ))
      )}
    </>
  );
}
