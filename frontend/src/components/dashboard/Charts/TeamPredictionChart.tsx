import { classes } from "../../../constants/classes";
import StackedBar from "../../../ui/StackedBar";

interface Props {
  total: number;
  winRate: number;
  teamName: string;
}

export default function TeamPredictionChart({
  total,
  winRate,
  teamName,
}: Props) {
  const { stats } = classes;
  const zeroPredictions = "No prediction history";
  const label = `${teamName.substring(0, 13)} ${winRate}%`;

  return (
    <div className={stats.teamRow}>
      {total !== 0 ? (
        <>
          <div className={stats.predictionRow}>
            <img src="/logo.svg" /> {label}
          </div>
          <StackedBar firstValue={winRate} secondValue={100 - winRate} />
        </>
      ) : (
        <>
          <div className={stats.predictionRow}>
            <img src="/logo.svg" /> {zeroPredictions}
          </div>
          <div className={stats.noPrediction}>{teamName}</div>
        </>
      )}
    </div>
  );
}
