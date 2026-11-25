import Chart from "./Chart";
import { classes } from "../constants/classes";
import { OUTCOME_COLORS as colors } from "../../../shared";
import Legend from "./Legend";

interface Props {
  market: string;
  percentage: number;
  caller: string;
}

export default function ChartPanel({ market, percentage, caller }: Props) {
  const { stats } = classes;
  let firstColor: string = colors.lost;
  let secondColor: string = colors.won;
  let firstLabel = "won";
  let secondLabel = "lost";

  if (caller === "league") {
    firstColor = market === "over" ? colors.under : colors.nogoal;
    secondColor = market === "over" ? colors.over : colors.goal;
    firstLabel = market;
    secondLabel = market === "goal" ? "nogoal" : "under";
  }

  const myClass =
    caller === "league" ? stats.leaguesChart : stats.predictionsChart;

  return (
    <div className={myClass}>
      <Chart
        winPercentage={percentage}
        firstColor={firstColor}
        secondColor={secondColor}
      />
      <div className={stats.legendContainer}>
        <Legend market={firstLabel} percentage={percentage} />
        <Legend market={secondLabel} percentage={100 - percentage} />
      </div>
    </div>
  );
}
