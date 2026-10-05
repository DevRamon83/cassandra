import type { Match } from "../../../shared";
import { getMatchDate } from "../helpers/getLeagueData";
import SingleMatchRow from "./SingleMatchRow";

interface SingleMatchProps {
  match: Match;
}

export default function SingleMatch({ match }: SingleMatchProps) {
  const { away_score, away_team_name, home_score, home_team_name, match_date } =
    match;

  const aGoal = away_score === null ? "-" : away_score;
  const hGoal = home_score === null ? "-" : home_score;
  const homeLogo = `/teams/${home_team_name}.jpg`;
  const awayLogo = `/teams/${away_team_name}.jpg`;

  const { matchDate, time } = getMatchDate(match_date);

  return (
    <div className="match__container">
      <div className="match__result">
        <SingleMatchRow logo={homeLogo} team={home_team_name} goal={hGoal} />
        <SingleMatchRow logo={awayLogo} team={away_team_name} goal={aGoal} />
      </div>
      <div className="match__date">
        <p>{matchDate}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
