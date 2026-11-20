import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";

interface Props {
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

export default function TrackerMenu({ currentTab, setCurrentTab }: Props) {
  const tabs = ["history", "new"];

  const { tracker } = classes;
  return (
    <div className={tracker.menu}>
      {tabs.map((tab) => (
        <button
          className={`${tracker.btnMenu}${tab === currentTab ? "-active" : ""}`}
          onClick={() => setCurrentTab(tab)}
          key={tab}
        >
          {tab === "history" ? "Your bets" : "New bet"}
        </button>
      ))}
    </div>
  );
}
