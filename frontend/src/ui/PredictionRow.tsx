import { classes } from "../constants/classes";

interface Props {
  prediction: string | null;
  league: string;
  accuracy: string | null;
}

export default function PredictionRow({ prediction, league, accuracy }: Props) {
  const { predictions } = classes;
  return (
    <div className={predictions.accuracyContainer}>
      <div className={`${predictions.accuracy}${accuracy}`} />
      <div>{prediction?.replace("_", "")}</div>
      <img src={`/${league}.svg`} />
    </div>
  );
}
