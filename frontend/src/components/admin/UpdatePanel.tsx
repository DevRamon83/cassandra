import { useState, type Dispatch, type SetStateAction } from "react";
import UpdateDispatch from "../../ui/UpdateDispatch";
import { classes } from "../../constants/classes";
import type { Match } from "../../../../shared";

interface Props {
  match: Match;
  setMatchData: Dispatch<SetStateAction<string | null>>;
}

export default function UpdatePanel({ match, setMatchData }: Props) {
  const [update, setUpdate] = useState<string | null>(null);

  return (
    <>
      {!update ? (
        <>
          <h2>What would you like to update?</h2>
          <div className={classes.match.dispatch}>
            <button onClick={() => setUpdate("match")}>Update match</button>
            <button onClick={() => setUpdate("date")}>Update date</button>
          </div>
        </>
      ) : (
        <UpdateDispatch
          match={match}
          update={update}
          setUpdate={setUpdate}
          setMatchData={setMatchData}
        />
      )}
    </>
  );
}
