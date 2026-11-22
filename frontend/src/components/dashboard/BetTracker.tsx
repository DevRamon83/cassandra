import { useState } from "react";
import { classes } from "../../constants/classes";
import TrackerMenu from "../../ui/TrackerMenu";
import NewBet from "./NewBet";
import BetsHistory from "./BetsHistory";

export default function BetTracker() {
  const [currentTab, setCurrentTab] = useState("new");
  const { tracker } = classes;
  return (
    <div className={tracker.main}>
      <TrackerMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "new" ? <NewBet /> : <BetsHistory />}
    </div>
  );
}
