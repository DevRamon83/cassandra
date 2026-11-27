import type { StatsCounts } from "../../../typings/interfaces";
import TeamChart from "./TeamChart";

interface Props {
  market: string;
  team: string;
  tail: string;
  allData: StatsCounts;
  homeData: StatsCounts;
  awayData: StatsCounts;
}

export default function TeamChartsContainer({
  market,
  team,
  tail,
  allData,
  homeData,
  awayData,
}: Props) {
  return (
    <>
      <TeamChart
        where="anywhere"
        market={market}
        data={allData}
        team={team}
        tail={tail}
      />
      <TeamChart
        where="home"
        market={market}
        data={homeData}
        team={team}
        tail={tail}
      />
      <TeamChart
        where="away"
        market={market}
        data={awayData}
        team={team}
        tail={tail}
      />
    </>
  );
}
