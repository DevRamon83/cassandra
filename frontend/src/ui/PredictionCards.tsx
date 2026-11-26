import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { classes } from "../constants/classes";
import type { PredictionUI } from "../typings/interfaces";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import PredictionCardsContainer from "./PredictionCardsContainer";
import PredictionCardsMenu from "./PredictionCardsMenu";

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

  const currentIndex = tabs.indexOf(currentTab);

  return (
    <>
      <PredictionCardsMenu
        tabs={tabs}
        setReliability={setReliability}
        setCurrentTab={setCurrentTab}
        currentIndex={currentIndex}
      />

      <div className={rounds.wrapper}>
        <button className={rounds.leftScroll} onClick={scrollToLeft} />
        <PredictionCardsContainer
          refContainer={refContainer}
          predictions={filteredPredictions}
        />
        <button className={rounds.scrollRight} onClick={scrollToRight} />
      </div>
    </>
  );
}
