import { useState } from "react";
import type { PredictionsMap, PredictionUI } from "../../typings/interfaces";
import { classes } from "../../constants/classes";
import PredictionCards from "../../ui/PredictionCards";
import Stats from "./Stats";

interface Props {
  predictions: PredictionUI[];
}

export default function ShowPredictions({ predictions }: Props) {
  const predictionsMap: PredictionsMap = new Map();

  predictions.forEach((prediction) => {
    const settled = prediction.settled_at;

    if (!predictionsMap.has(settled)) {
      predictionsMap.set(settled, []);
    }

    predictionsMap.get(settled)!.push(prediction);
  });

  const tabs = [...predictionsMap.keys()].reverse();
  const [currentTab, setCurrentTab] = useState(tabs[tabs.length - 1]);
  const mapArray = predictionsMap.get(currentTab);

  return (
    <>
      <div className={classes.predictions.cards}>
        {mapArray && (
          <PredictionCards
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            mapArray={mapArray}
          />
        )}
      </div>
      <Stats allPredictions={predictions} />
    </>
  );
}
