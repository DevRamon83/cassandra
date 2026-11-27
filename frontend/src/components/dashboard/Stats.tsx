import { useContext, useEffect, useMemo, useState } from "react";
import { LeaguesContext } from "../../context/index";
import type {
  PredictionUI,
  StatsCounts,
  TeamMatches,
} from "../../typings/interfaces";
import { dataTeam, workOnLeague, workOnTeam } from "../../helpers/stats";
import StatsFilters from "../../ui/StatsFilters";
import type { SingleBet } from "../../../../shared";
import { classes } from "../../constants/classes";
import Anomalies from "./Anomalies";
import StatsView from "../../ui/StatsView";
import StatsFiltersByTeam from "../../ui/StatsFilterByTeam";
import OverviewChartsContainer from "./Charts/OverviewChartsContainer";
import TeamChartsContainer from "./Charts/TeamChartsContainer";
import MatchData from "./MatchData";

interface Props {
  allPredictions: PredictionUI[];
  cassandraBets: SingleBet[];
}

export default function Stats({ allPredictions, cassandraBets }: Props) {
  const { cache } = useContext(LeaguesContext);
  const [view, setView] = useState("overview");

  // Both view
  const [league, setLeague] = useState("all");
  const [market, setMarket] = useState("under/over");

  // Overview
  const [tolerance, setTolerance] = useState("1");
  const [predictionMarket, setPredictionMarket] = useState("all");

  // By team
  const [tail, setTail] = useState("all");
  const [team, setTeam] = useState("all");

  const states = { league, tolerance, market, predictionMarket, tail, team };
  const setters = {
    setLeague,
    setTolerance,
    setMarket,
    setPredictionMarket,
    setTail,
    setTeam,
  };

  const data: Record<string, StatsCounts> = useMemo(() => {
    const numTol = Number(tolerance);
    const serieA = workOnLeague(cache.serieA.rounds, numTol);
    const liga = workOnLeague(cache.liga.rounds, numTol);
    const ligue1 = workOnLeague(cache.ligue1.rounds, numTol);
    const bundesliga = workOnLeague(cache.bundesliga.rounds, numTol);
    const premier = workOnLeague(cache.premier.rounds, numTol);

    return { serieA, liga, ligue1, bundesliga, premier };
  }, [tolerance]);

  const teamMatches: TeamMatches = useMemo(() => {
    const rounds = cache[league]?.rounds;
    const nextRound = cache[league]?.nextRound;
    if (view === "overview") return { home: [], away: [], all: [] };
    const { home, away, all } = workOnTeam(rounds, team, nextRound);

    return { home, away, all };
  }, [team, league, view]);

  useEffect(() => {
    if (view === "overview") return;
    setTeam(cache[league].positions[0]);
  }, [league, view]);

  const homeData = dataTeam(teamMatches.home, tail, view);
  const awayData = dataTeam(teamMatches.away, tail, view);
  const allData = dataTeam(teamMatches.all, tail, view);

  const { stats } = classes;

  const viewHandler = (value: string) => {
    value === "overview" ? setLeague("all") : setLeague("serieA");
    setView(value);
    setLeague("serieA");
    setTeam(cache.serieA.positions[0]);
  };

  const teams: string[] = view === "team" ? cache[league].positions : [];

  return (
    <>
      {view === "overview" ? (
        <StatsFilters states={states} setters={setters} />
      ) : (
        <StatsFiltersByTeam states={states} setters={setters} teams={teams} />
      )}
      <div className={stats.allCharts}>
        {view === "team" ? (
          <TeamChartsContainer
            market={market}
            team={team}
            tail={tail}
            allData={allData}
            homeData={homeData}
            awayData={awayData}
          />
        ) : (
          <OverviewChartsContainer
            market={market}
            data={data}
            league={league}
            allPredictions={allPredictions}
            predictionMarket={predictionMarket}
            cassandraBets={cassandraBets}
          />
        )}

        <StatsView viewHandler={viewHandler} view={view} />

        {view === "overview" ? (
          <Anomalies
            data={data}
            league={league}
            tolerance={Number(tolerance)}
          />
        ) : (
          <MatchData
            league={league}
            team={team}
            allPredictions={allPredictions}
          />
        )}
      </div>
    </>
  );
}
