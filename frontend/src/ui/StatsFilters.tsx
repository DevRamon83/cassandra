import type { Dispatch, SetStateAction } from "react";
import {
  leaguesFilter,
  marketsFilter,
  predictionsFilter,
  toleranceFilter,
} from "../../../shared";
import SelectOnChange from "./SelectOnChange";
import { classes } from "../constants/classes";

interface Props {
  states: Record<string, string>;
  setters: Record<string, Dispatch<SetStateAction<string>>>;
}

export default function StatsFilters({ states, setters }: Props) {
  const { league, tolerance, market, predictionMarket } = states;
  const { setLeague, setTolerance, setMarket, setPredictionMarket } = setters;
  const { stats } = classes;
  return (
    <div className={stats.filtersContainer}>
      <div className={stats.filter}>
        <h4>Chose a league</h4>
        <SelectOnChange
          value={league}
          setter={setLeague}
          data={leaguesFilter}
        />
      </div>
      <div className={stats.filter}>
        <h4>Chose a market</h4>
        <SelectOnChange
          value={market}
          setter={setMarket}
          data={marketsFilter}
        />
      </div>
      <div className={stats.filter}>
        <h4>Find anomalies</h4>
        <SelectOnChange
          value={tolerance}
          setter={setTolerance}
          data={toleranceFilter}
        />
      </div>
      <div className={stats.filter}>
        <h4>Chose a prediction</h4>
        <SelectOnChange
          value={predictionMarket}
          setter={setPredictionMarket}
          data={predictionsFilter}
        />
      </div>
    </div>
  );
}
