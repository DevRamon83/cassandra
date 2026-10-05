import { useState } from "react";
import { leagues } from "../../../shared";
import League from "../components/League";
import { getCurrentSeason } from "../helpers/getLeagueData";

const season = getCurrentSeason();
const LEAGUE_COMPONENTS = {
  serieA: <League league="serieA" season={season} />,
  liga: <League league="liga" season={season} />,
};

type LeagueKey = keyof typeof LEAGUE_COMPONENTS;

export default function Standings() {
  const [currentLeague, setCurrentLeague] = useState<LeagueKey>("serieA");

  return (
    <>
      <p>standings</p>
      {leagues.map((league) => (
        <button
          key={league}
          onClick={() => setCurrentLeague(league as LeagueKey)}
        >
          {league}
        </button>
      ))}

      {LEAGUE_COMPONENTS[currentLeague]}
    </>
  );
}
