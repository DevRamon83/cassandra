import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";

const reliability = ["strength", "▼", "◆", "▲"];
const convert = ["strength", "low", "medium", "high"];
interface Props {
  setReliability: Dispatch<SetStateAction<string>>;
}

export default function Reliability({ setReliability }: Props) {
  return (
    <>
      {reliability.map((value, index) => (
        <button
          className={`${classes.predictions.reliability}-${convert[index]}`}
          key={value}
          onClick={() => setReliability(convert[index])}
        >
          {value}
        </button>
      ))}
    </>
  );
}
