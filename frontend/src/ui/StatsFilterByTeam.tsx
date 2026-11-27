import type { Dispatch, SetStateAction } from "react";
import { leagues, marketsFilter, tailFilter } from "../../../shared";
import SelectOnChange from "./SelectOnChange";
import { classes } from "../constants/classes";

interface Props {
  states: Record<string, string>;
  setters: Record<string, Dispatch<SetStateAction<string>>>;
  teams: string[];
}

export default function StatsFiltersByTeam({ states, setters, teams }: Props) {
  const { league, team, market, tail } = states;
  const { setLeague, setTeam, setMarket, setTail } = setters;
  const { stats } = classes;

  const teamsFilter = Object.fromEntries(teams.map((team) => [team, team]));
  const leaguesFilter = Object.fromEntries(
    leagues.map((league) => [league, league]),
  );

  return (
    <div className={stats.filtersContainer}>
      <div className={stats.filter}>
        <h4>Chose a league</h4>
        <SelectOnChange
          value={league}
          setter={setLeague}
          data={leaguesFilter}
        />
      </div>
      <div className={stats.filter}>
        <h4>Chose a market</h4>
        <SelectOnChange
          value={market}
          setter={setMarket}
          data={marketsFilter}
        />
      </div>
      <div className={stats.filter}>
        <h4>Chose a team</h4>
        <SelectOnChange value={team} setter={setTeam} data={teamsFilter} />
      </div>
      <div className={stats.filter}>
        <h4>Matches window</h4>
        <SelectOnChange value={tail} setter={setTail} data={tailFilter} />
      </div>
    </div>
  );
}
