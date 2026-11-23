import { useState } from "react";
import { classes } from "../../constants/classes";
import predictionsOutcomes from "../../api/handlers/predictionsOutcomes";

export default function UpdatePredictions() {
  const { system } = classes;

  type StatusType = keyof typeof system;

  const [response, setResponse] = useState<StatusType>("outcomes");

  const sendData = async () => {
    if (response !== "outcomes") return;
    setResponse("wait");
    const resp = await predictionsOutcomes();
    console.log(resp);

    if (resp.error) {
      setResponse("error");
    } else {
      setResponse("success");
    }
  };

  return (
    <>
      <button className={system[response]} onClick={sendData}>
        {response}
      </button>
    </>
  );
}
