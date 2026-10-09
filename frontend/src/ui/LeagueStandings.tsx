import type { LeagueData } from "../../../shared/index";
import { classes } from "../constants/classes";
import { getRowClass } from "../helpers/atomics";
import LeagueStandingsColumn from "./LeagueStandingsColumns";

interface LeagueStandingsProps {
  positions: string[];
  myLeague: LeagueData;
}

export default function LeagueStandings({
  positions,
  myLeague,
}: LeagueStandingsProps) {
  const { standings } = classes;
  const evenClass = standings.evenRow;
  const oddClass = standings.oddRow;

  return (
    <div className={standings.main}>
      <div className={standings.container}>
        <LeagueStandingsColumn classColumn={standings.column} />

        {positions.map((team: string, index: number) => (
          <div className={getRowClass(index, evenClass, oddClass)} key={team}>
            <div>{index + 1}</div>
            <div>{team}</div>
            <div>{myLeague.standings[team].played}</div>
            <div>{myLeague.standings[team].w}</div>
            <div>{myLeague.standings[team].l}</div>
            <div>{myLeague.standings[team].d}</div>
            <div>{myLeague.standings[team].scored}</div>
            <div>{myLeague.standings[team].conceded}</div>
            <div>{myLeague.standings[team].gd}</div>
            <div>{myLeague.standings[team].points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
