import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";

const reliability = ["reliability", "low", "medium", "high"];
interface Props {
  setReliability: Dispatch<SetStateAction<string>>;
}

export default function Reliability({ setReliability }: Props) {
  return (
    <>
      {reliability.map((value) => (
        <button
          className={`${classes.predictions.reliability}-${value}`}
          key={value}
          onClick={() => setReliability(value)}
        >
          {value}
        </button>
      ))}
    </>
  );
}
