import { useContext, useState } from "react";
import { classes } from "../constants/classes";
import { getMatchDate } from "../helpers/getLeagueData";
import SingleMatchRow from "../ui/SingleMatchRow";
import UpdatePanel from "./admin/UpdatePanel";
import type { Match } from "../../../shared";
import { AuthContext } from "../context";

export interface Props {
  match: Match;
}

export default function SingleMatch({ match }: Props) {
  const { away_score, away_team_name, home_score, home_team_name, match_date } =
    match;
  const { auth } = useContext(AuthContext);
  const [matchData, setMatchData] = useState<string | null>(null);
  const isAdmin = auth?.username === "admin";

  const aGoal = away_score === null ? "-" : away_score;
  const hGoal = home_score === null ? "-" : home_score;

  const { matchDate, time } = getMatchDate(match_date);

  const updateHandler = () => {
    if (!isAdmin) return;
    const matchJSON = JSON.stringify(match, null, 2);

    setMatchData(matchJSON);
  };

  return (
    <>
      <div className={classes.match.container}>
        <div onClick={updateHandler} className={classes.match.result}>
          <SingleMatchRow team={home_team_name} goal={hGoal} />
          <SingleMatchRow team={away_team_name} goal={aGoal} />
        </div>
        <div className={classes.match.date}>
          <p>{matchDate}</p>
          <p>{time}</p>
        </div>
      </div>
      {matchData && isAdmin && (
        <div className={classes.match.fixer}>
          <UpdatePanel match={match} setMatchData={setMatchData} />
        </div>
      )}
    </>
  );
}
