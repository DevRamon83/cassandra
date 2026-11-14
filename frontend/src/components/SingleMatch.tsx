import { useContext, useState } from "react";
import { classes } from "../constants/classes";
import { getMatchDate } from "../helpers/getLeagueData";
import SingleMatchRow from "../ui/SingleMatchRow";
import { AuthContext } from "../App";
import UpdatePanel from "./admin/UpdatePanel";
import type { SingleMatchProps } from "../typings/interfaces";

export default function SingleMatch({ match }: SingleMatchProps) {
  const { away_score, away_team_name, home_score, home_team_name, match_date } =
    match;
  const { logged } = useContext(AuthContext);
  const [matchData, setMatchData] = useState<string | null>(null);
  const isAdmin = logged === "admin";

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
