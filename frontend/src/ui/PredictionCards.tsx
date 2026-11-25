import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { classes } from "../constants/classes";
import type { PredictionUI } from "../typings/interfaces";
import Reliability from "./Reliability";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import PredictionCardsContainer from "./PredictionCardsContainer";

interface Props {
  mapArray: PredictionUI[];
  tabs: number[];
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
}

export default function PredictionCards({
  mapArray,
  tabs,
  currentTab,
  setCurrentTab,
}: Props) {
  const [reliability, setReliability] = useState("strength");
  const refContainer = useRef<HTMLDivElement>(null);
  const scrollToRight = useHorizontalScroll("left", refContainer);
  const scrollToLeft = useHorizontalScroll("right", refContainer);

  const filteredPredictions =
    reliability === "strength"
      ? mapArray
      : mapArray.filter((p) => p.prediction_accuracy === reliability);

  const { rounds } = classes;
  return (
    <>
      {filteredPredictions.length === 0 ? (
        <h4>No predictions yet. Check back later!</h4>
      ) : (
        <>
          <div className={rounds.mainPredictions}>
            {tabs.map((tab, index) => (
              <button
                className={tab === currentTab ? rounds.current : rounds.tabs}
                onClick={() => setCurrentTab(tabs[index])}
                key={tab}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className={rounds.wrapper}>
            <div className={classes.predictions.reliability}>
              <Reliability setReliability={setReliability} />
            </div>
            <button className={rounds.leftScroll} onClick={scrollToLeft} />
            <PredictionCardsContainer
              refContainer={refContainer}
              predictions={filteredPredictions}
            />
            <button className={rounds.scrollRight} onClick={scrollToRight} />
          </div>
        </>
      )}
    </>
  );
}
