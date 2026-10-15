import { useState } from "react";
import type { LeagueProps } from "../../../shared/index.ts";
import update from "../api/handlers/update.ts";
import { classes } from "../constants/classes.ts";

export default function UpdateSeason({ league, season }: LeagueProps) {
  const { system } = classes;

  type StatusType = keyof typeof system;

  const [response, setResponse] = useState<StatusType>("update");

  const sendData = async () => {
    if (response !== "update") return;
    setResponse("wait");
    const resp = await update({ league, season });
    if (resp.error) {
      setResponse("error");
    } else {
      setResponse("success");
    }
  };

  return (
    <button className={system[response]} onClick={sendData}>
      {response}
    </button>
  );
}
