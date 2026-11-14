import { useState, type SubmitEvent } from "react";
import type { Match } from "../../../../shared";
import Input from "../../ui/Input";
import { classes } from "../../constants/classes";
import updateMatch from "../../api/handlers/updateMatch";
import { definePoints, defineResult } from "../../helpers/atomics";

interface Props {
  match: Match;
  closeHandler: () => void;
}

export default function UpdateMatch({ match, closeHandler }: Props) {
  const [notify, setNotify] = useState<string | null>(null);
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const away = Number(formData.get("away_score"));
    const home = Number(formData.get("home_score"));
    const homeResult = defineResult(home, away);
    const awayResult = defineResult(away, home);
    const data = {
      ...match,
      home_points: definePoints(homeResult),
      home_result: homeResult,
      home_score: home,
      away_points: definePoints(awayResult),
      away_result: awayResult,
      away_score: away,
    };

    const resp = await updateMatch(data);

    if (resp.errorMessage) return setNotify(resp.errorMessage);
    setNotify("success");
  };
  return (
    <>
      <form className={classes.match.updateForm} onSubmit={handleSubmit}>
        <Input
          htmlFor="home_score"
          type="number"
          label={match.home_team_name}
        />

        <Input
          htmlFor="away_score"
          type="number"
          label={match.away_team_name}
        />

        <button type="submit">Save</button>
      </form>
      <button onClick={closeHandler}>close</button>
      {notify && <div>{notify}</div>}
    </>
  );
}
