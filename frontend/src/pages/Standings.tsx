import { useState } from "react";
import { getCurrentSeason, leagues } from "../../../shared";
import League from "../components/League";
import { classes } from "../constants/classes";

const season = getCurrentSeason();
const LEAGUE_COMPONENTS = {
  serieA: <League league="serieA" season={season} />,
  liga: <League league="liga" season={season} />,
  ligue1: <League league="ligue1" season={season} />,
  premier: <League league="premier" season={season} />,
  bundesliga: <League league="bundesliga" season={season} />,
};

type LeagueKey = keyof typeof LEAGUE_COMPONENTS;

export default function Standings() {
  const [currentLeague, setCurrentLeague] = useState<LeagueKey>("serieA");
  const { standings } = classes;

  return (
    <>
      <div className={standings.leagues}>
        {leagues.map((league) => (
          <div className={standings.flag} key={league}>
            <img
              onClick={() => setCurrentLeague(league as LeagueKey)}
              src={`/${league}.svg`}
              className={
                currentLeague === league ? standings.btnActive : standings.btn
              }
              title={league}
              alt={league}
            />
          </div>
        ))}
      </div>
      {LEAGUE_COMPONENTS[currentLeague]}
    </>
  );
}
