import { useState } from "react";
import { classes } from "../../constants/classes.ts";
import predictions from "../../api/handlers/predictions.ts";

export default function Predictions() {
  const { system } = classes;

  type StatusType = keyof typeof system;

  const [response, setResponse] = useState<StatusType>("predictions");

  const sendData = async () => {
    if (response !== "predictions") return;
    setResponse("wait");
    const resp = await predictions();

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
