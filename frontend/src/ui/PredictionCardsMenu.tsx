import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";
import Reliability from "./Reliability";

interface Props {
  tabs: number[];
  setReliability: Dispatch<SetStateAction<string>>;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  currentIndex: number;
}

export default function PredictionCardsMenu({
  tabs,
  setReliability,
  setCurrentTab,
  currentIndex,
}: Props) {
  const { rounds } = classes;

  const tabHandler = (value: number) => {
    const newTab = tabs[currentIndex + value];
    if (!newTab) return;
    setCurrentTab(newTab);
  };

  return (
    <div className={rounds.mainPredictions}>
      <div className={classes.predictions.reliability}>
        <Reliability setReliability={setReliability} />
      </div>

      <button
        className={rounds.tabs}
        onClick={() => tabHandler(-1)}
        disabled={currentIndex <= 0}
      >
        {"<"}
      </button>

      <div className={rounds.current}>{currentIndex + 1}</div>

      <button
        className={rounds.tabs}
        onClick={() => tabHandler(1)}
        disabled={currentIndex >= tabs.length - 1}
      >
        {">"}
      </button>
    </div>
  );
}
