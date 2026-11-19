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

  return (
    <div ref={refContainer} className={rounds.container}>
      {predictions.map((prediction) => (
        <div className={classes.predictions.card} key={prediction.id}>
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
