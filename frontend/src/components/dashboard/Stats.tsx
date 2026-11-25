import { useContext, useMemo, useState } from "react";
import { LeaguesContext } from "../../context/index";
import type { PredictionUI, StatsCounts } from "../../typings/interfaces";
import { workOnLeague } from "../../helpers/stats";
import StatsFilters from "../../ui/StatsFilters";
import { leagues, MARKET_OUTCOMES } from "../../../../shared";
import ChartPanel from "../../ui/ChartPanel";
import { classes } from "../../constants/classes";
import Anomalies from "../../ui/Anomalies";

interface Props {
  allPredictions: PredictionUI[];
}

export default function Stats({ allPredictions }: Props) {
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
  }, [league, tolerance]);

  const predictions = useMemo(() => {
    let length = 0;
    let won = 0;
    const allowedOutcomes = MARKET_OUTCOMES[predictionMarket];

    for (const pick of allPredictions) {
      if (pick.prediction_result === null || pick.prediction === null) continue;
      if (league !== "all" && pick.league !== league) continue;
      if (allowedOutcomes && !allowedOutcomes.includes(pick.prediction))
        continue;

      length++;
      if (pick.prediction_result) won++;
    }

    return { length, won };
  }, [allPredictions, predictionMarket, league]);

  const myMarket = market === "goal/nogoal" ? "goal" : "over";
  const getTotal = () => {
    let value = 0;
    leagues.forEach((league) => {
      value += data[league][myMarket];
    });
    return value / 5;
  };

  const percentage = league === "all" ? getTotal() : data[league][myMarket];

  const { won, length } = predictions;
  const wonPercentage = Math.round((won / length) * 100);
  const { stats } = classes;

  const leagueLabel =
    league === "all"
      ? "All matches across all leagues"
      : `All ${league} matches`;

  const getAllAnomalies = () => {
    let anomalies = 0;
    leagues.forEach((league) => {
      const anomaliesLength = data[league].allSame.outcomes.length;
      console.log("league ", league, "anomalies ", anomaliesLength);
      anomalies += anomaliesLength;
    });

    return anomalies;
  };

  const anomalies =
    league === "all" ? getAllAnomalies() : data[league].allSame.outcomes.length;
  console.log("prova ", data);

  return (
    <>
      <StatsFilters states={states} setters={setters} />
      <div className={stats.allCharts}>
        <div className={stats.leaguesContainer}>
          <h4>{leagueLabel} </h4>
          <ChartPanel
            market={myMarket}
            percentage={percentage}
            caller="league"
          />
        </div>

        {Number.isNaN(wonPercentage) ? (
          <div>There is no prediction for this market</div>
        ) : (
          <div className={stats.predictionsContainer}>
            <h4>{`Based on ${length} ${length === 1 ? "prediction" : "predictions"}`}</h4>
            <ChartPanel
              market={market}
              percentage={wonPercentage}
              caller="predictions"
            />
          </div>
        )}
        <Anomalies
          data={data[league]}
          anomalies={anomalies}
          league={league}
          tolerance={Number(tolerance)}
        />
      </div>
    </>
  );
}
