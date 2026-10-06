import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";
import { defineFirstMatch, totalMatches } from "../helpers/roundsNavData";

interface RoundsNavigatorProps {
  show: number;
  setShow: Dispatch<SetStateAction<number>>;
  league: string;
}

export default function RoundsNavigator({
  show,
  setShow,
  league,
}: RoundsNavigatorProps) {
  const [values, setValues] = useState<number[]>([]);
  const { rounds } = classes;

  useEffect(() => {
    const array = [];
    const games = totalMatches(league);
    const start = defineFirstMatch(show, games);

    let counter = 0;
    while (counter !== 9) {
      const round = start + counter;
      array.push(round);
      counter += 1;
    }
    setValues(array);
  }, [show]);

  return (
    <div className={rounds.main}>
      {values.map((value) => (
        <div
          className={value === show ? rounds.current : rounds.tabs}
          key={value}
          onClick={() => setShow(value)}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
