import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";

interface Props {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}

const tabs = ["history", "current"];

export default function PredictionsMainMenu({ tab, setTab }: Props) {
  const { predictions } = classes;
  return (
    <div className={predictions.view}>
      {tabs.map((currentTab) => (
        <button
          key={currentTab}
          className={`${predictions.viewBtn}${tab === currentTab ? "-active" : ""}`}
          onClick={() => setTab(currentTab)}
        >
          {currentTab === "history" ? "Prediction History" : "Weekly Picks"}
        </button>
      ))}
    </div>
  );
}
