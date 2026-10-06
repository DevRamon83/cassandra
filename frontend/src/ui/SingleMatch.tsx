import type { Match } from "../../../shared";
import { classes } from "../constants/classes";
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

  const { matchDate, time } = getMatchDate(match_date);

  return (
    <div className={classes.match.container}>
      <div className={classes.match.result}>
        <SingleMatchRow team={home_team_name} goal={hGoal} />
        <SingleMatchRow team={away_team_name} goal={aGoal} />
      </div>
      <div className={classes.match.date}>
        <p>{matchDate}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
