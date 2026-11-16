import type { Dispatch, SetStateAction } from "react";
import type { Match } from "../../../shared";
import UpdateDate from "../components/admin/UpdateDate";
import UpdateMatch from "../components/admin/UpdateMatch";

interface Props {
  match: Match;
  setMatchData: Dispatch<SetStateAction<string | null>>;
  update: string;
  setUpdate: Dispatch<SetStateAction<string | null>>;
}

export default function UpdateDispatch({
  match,
  update,
  setUpdate,
  setMatchData,
}: Props) {
  const closeHandler = () => {
    setUpdate(null);
    setMatchData(null);
  };
  return (
    <>
      {update === "match" ? (
        <UpdateMatch match={match} closeHandler={closeHandler} />
      ) : (
        <UpdateDate match={match} closeHandler={closeHandler} />
      )}
    </>
  );
}
