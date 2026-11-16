import { useState, type SubmitEvent } from "react";
import type { Match } from "../../../../shared";
import { classes } from "../../constants/classes";
import Input from "../../ui/Input";
import updateDate from "../../api/handlers/updateDate";

interface Props {
  match: Match;
  closeHandler: () => void;
}

export default function UpdateDate({ match, closeHandler }: Props) {
  const [notify, setNotify] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get("dateOfMatch");
    if (typeof date !== "string" || date.trim() === "" || !date)
      return setNotify("Chose a date");

    const utcString = new Date(date).toISOString();
    const data = {
      ...match,
      match_date: utcString,
    };

    const resp = await updateDate(data);

    if (resp.errorMessage) return setNotify(resp.errorMessage);
    setNotify("success");
  };

  return (
    <>
      <div>
        <h3>
          {match.home_team_name} Vs {match.away_team_name}
        </h3>
        <form className={classes.match.updateForm} onSubmit={handleSubmit}>
          <Input
            type="datetime-local"
            label="Choose a date"
            htmlFor="dateOfMatch"
          />

          <button type="submit">Save</button>
        </form>
        <button onClick={closeHandler}>close</button>
        {notify && <div>{notify}</div>}
      </div>
    </>
  );
}
