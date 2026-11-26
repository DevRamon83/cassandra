import { classes } from "../constants/classes";
import { OUTCOME_COLORS as colors } from "../../../shared";
import Legend from "./Legend";
import PieChart from "./PieChart";
import DonutChart from "./DonutChart";

interface Props {
  market?: string;
  percentage: number;
  caller: string;
  balance?: string;
}

export default function ChartPanel({
  market,
  percentage,
  caller,
  balance,
}: Props) {
  const { stats } = classes;
  let firstColor: string = colors.lost;
  let secondColor: string = colors.won;
  let firstLabel = "won";
  let secondLabel = "lost";

  if (caller === "league") {
    firstColor = market === "over" ? colors.under : colors.nogoal;
    secondColor = market === "over" ? colors.over : colors.goal;
    firstLabel = market!;
    secondLabel = market === "goal" ? "nogoal" : "under";
  }

  const myClass =
    caller === "league" ? stats.leaguesChart : stats.predictionsChart;

  return (
    <div className={myClass}>
      {caller === "cassandra" ? (
        <DonutChart
          winPercentage={percentage}
          firstColor={firstColor}
          secondColor={secondColor}
          centerText={balance!}
        />
      ) : (
        <PieChart
          winPercentage={percentage}
          firstColor={firstColor}
          secondColor={secondColor}
        />
      )}
      <div className={stats.legendContainer}>
        <Legend market={firstLabel} percentage={percentage} />
        <Legend market={secondLabel} percentage={100 - percentage} />
      </div>
    </div>
  );
}
