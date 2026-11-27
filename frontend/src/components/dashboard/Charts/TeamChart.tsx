import { classes } from "../../../constants/classes";
import type { StatsCounts } from "../../../typings/interfaces";
import ChartPanel from "../../../ui/ChartPanel";

interface Props {
  team: string;
  market: string;
  data: StatsCounts;
  tail: string;
  where: string;
}

export default function TeamChart({ team, market, data, tail, where }: Props) {
  const { stats } = classes;
  const myMarket = market === "goal/nogoal" ? "goal" : "over";

  const tailConvert = tail === "three" ? 3 : 5;
  const tailLabel = tail === "all" ? "all" : `last ${tailConvert}`;
  const whereLabel = where === "anywhere" ? "" : ` ${where}`;

  const label = `${team}: ${tailLabel}${whereLabel} matches`;

  return (
    <div className={stats.leaguesContainer}>
      <h4>{label} </h4>
      <ChartPanel
        market={myMarket}
        percentage={data[myMarket]}
        caller="league"
      />
    </div>
  );
}
