import { useState } from "react";
import type { LeagueProps } from "../../../../shared/index.ts";
import { classes } from "../../constants/classes.ts";
import predictions from "../../api/handlers/predictions.ts";

export default function Predictions({ league, season }: LeagueProps) {
  const { system } = classes;

  type StatusType = keyof typeof system;

  const [response, setResponse] = useState<StatusType>("predictions");

  const sendData = async () => {
    if (response !== "predictions") return;
    setResponse("wait");
    const resp = await predictions({ league, season });

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
