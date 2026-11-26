import { useState } from "react";
import { classes } from "../../constants/classes";
import TrackerMenu from "../../ui/TrackerMenu";
import NewBet from "./NewBet";
import BetsHistory from "./BetsHistory";
import type { SingleBet } from "../../../../shared";

interface Props {
  cassandraBet: SingleBet[];
}

export default function BetTracker({ cassandraBet }: Props) {
  const [currentTab, setCurrentTab] = useState("new");
  const { tracker } = classes;
  return (
    <div className={tracker.main}>
      <TrackerMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === "new" ? (
        <NewBet cassandraBet={cassandraBet} />
      ) : (
        <BetsHistory />
      )}
    </div>
  );
}
