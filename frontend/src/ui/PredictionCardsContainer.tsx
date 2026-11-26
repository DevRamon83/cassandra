import type { RefObject } from "react";
import { classes } from "../constants/classes";
import { getMatchDate } from "../helpers/getLeagueData";
import type { PredictionUI } from "../typings/interfaces";
import PredictionRow from "./PredictionRow";

interface Props {
  predictions: PredictionUI[];
  refContainer: RefObject<HTMLDivElement | null>;
}

export default function PredictionCardsContainer({
  predictions,
  refContainer,
}: Props) {
  const { rounds } = classes;

  const defineClass = (prediction: PredictionUI) => {
    const outcome = prediction.prediction_result ? "won" : "lost";
    return prediction.prediction_result === null
      ? classes.predictions.card
      : `${classes.predictions.card} ${classes.predictions.card}-${outcome}`;
  };

  return (
    <div ref={refContainer} className={rounds.predictions}>
      {predictions.length === 0 && <h2>No predictions available!</h2>}
      {predictions.map((prediction) => (
        <div className={defineClass(prediction)} key={prediction.id}>
          <h4>{prediction.match}</h4>
          <h5>{getMatchDate(prediction.date).matchDate}</h5>
          <PredictionRow
            accuracy={prediction.prediction_accuracy}
            prediction={prediction.prediction}
            league={prediction.league}
          />
        </div>
      ))}
    </div>
  );
}
