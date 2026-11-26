import { leagues } from "../../../../../shared";
import { classes } from "../../../constants/classes";
import type { StatsCounts } from "../../../typings/interfaces";
import ChartPanel from "../../../ui/ChartPanel";

interface Props {
  league: string;
  market: string;
  data: Record<string, StatsCounts>;
}

export default function LeaguesChart({ league, market, data }: Props) {
  const { stats } = classes;
  const myMarket = market === "goal/nogoal" ? "goal" : "over";

  const getTotal = () => {
    let value = 0;
    leagues.forEach((league) => {
      value += data[league][myMarket];
    });
    return value / 5;
  };

  const percentage = league === "all" ? getTotal() : data[league][myMarket];

  const leagueLabel =
    league === "all"
      ? "All matches across all leagues"
      : `All ${league} matches`;

  return (
    <div className={stats.leaguesContainer}>
      <h4>{leagueLabel} </h4>
      <ChartPanel market={myMarket} percentage={percentage} caller="league" />
    </div>
  );
}
