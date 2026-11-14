import { useState } from "react";
import type { LeagueProps } from "../../../../shared/index.ts";
import { classes } from "../../constants/classes.ts";
import refreshCache from "../../api/handlers/refreshCache.ts";

export default function RefreshCache({ league, season }: LeagueProps) {
  const { system } = classes;

  type StatusType = keyof typeof system;

  const [response, setResponse] = useState<StatusType>("refresh");

  const sendData = async () => {
    if (response !== "refresh") return;
    setResponse("wait");
    const resp = await refreshCache({ league, season });

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
