import { useContext, useMemo, useState } from "react";
import { LeaguesContext } from "../../context/index";
import type { PredictionUI, StatsCounts } from "../../typings/interfaces";
import { workOnLeague } from "../../helpers/stats";
import StatsFilters from "../../ui/StatsFilters";
import { type SingleBet } from "../../../../shared";
import { classes } from "../../constants/classes";
import Anomalies from "./Anomalies";
import CassandraChart from "./Charts/CassandraChart";
import PredictionsChart from "./Charts/PredictionsChart";
import LeaguesChart from "./Charts/LeaguesChart";

interface Props {
  allPredictions: PredictionUI[];
  cassandraBets: SingleBet[];
}

export default function Stats({ allPredictions, cassandraBets }: Props) {
  const { cache } = useContext(LeaguesContext);
  const [league, setLeague] = useState("all");
  const [tolerance, setTolerance] = useState("1");
  const [market, setMarket] = useState("under/over");
  const [predictionMarket, setPredictionMarket] = useState("all");

  const states = { league, tolerance, market, predictionMarket };
  const setters = { setLeague, setTolerance, setMarket, setPredictionMarket };

  const data: Record<string, StatsCounts> = useMemo(() => {
    const numTol = Number(tolerance);
    const serieA = workOnLeague(cache.serieA.rounds, numTol);
    const liga = workOnLeague(cache.liga.rounds, numTol);
    const ligue1 = workOnLeague(cache.ligue1.rounds, numTol);
    const bundesliga = workOnLeague(cache.bundesliga.rounds, numTol);
    const premier = workOnLeague(cache.premier.rounds, numTol);

    return { serieA, liga, ligue1, bundesliga, premier };
  }, [tolerance]);

  const { stats } = classes;

  return (
    <>
      <StatsFilters states={states} setters={setters} />
      <div className={stats.allCharts}>
        <LeaguesChart market={market} data={data} league={league} />
        <PredictionsChart
          market={market}
          allPredictions={allPredictions}
          league={league}
          predictionMarket={predictionMarket}
        />
        <CassandraChart cassandraBets={cassandraBets} />

        <Anomalies data={data} league={league} tolerance={Number(tolerance)} />
      </div>
    </>
  );
}
