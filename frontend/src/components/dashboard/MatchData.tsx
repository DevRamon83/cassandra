import { useContext, useMemo } from "react";
import { LeaguesContext } from "../../context";
import { getMatchDate } from "../../helpers/getLeagueData";
import type { PredictionsData, PredictionUI } from "../../typings/interfaces";
import {
  getPredictionRatio,
  matchFinder,
  predictionsHistory,
} from "../../helpers/stats";
import { classes } from "../../constants/classes";
import TeamPredictionChart from "./Charts/TeamPredictionChart";
import type { Match } from "../../../../shared";

interface Props {
  league: string;
  team: string;
  allPredictions: PredictionUI[];
}

export default function MatchData({ league, team, allPredictions }: Props) {
  const { cache } = useContext(LeaguesContext);

  const matchData: Match | null = useMemo(() => {
    const rounds = cache[league].rounds;
    const nextRound = cache[league].nextRound;
    const currentRound = rounds[nextRound];
    const match = matchFinder(currentRound, team);
    if (!match) return null;
    return match;
  }, [league, team]);

  const predictionsData: PredictionsData = useMemo(() => {
    if (!matchData) return { homeRatio: {}, awayRatio: {} };

    const { homePredictions, awayPredictions } = predictionsHistory(
      allPredictions,
      league,
      matchData.home_team_name,
      matchData.away_team_name,
    );

    const homeRatio = getPredictionRatio(homePredictions);
    const awayRatio = getPredictionRatio(awayPredictions);

    return { homeRatio, awayRatio };
  }, [matchData, league]);

  const teamsFallback = { away_team_name: "", home_team_name: "" };

  const { away_team_name, home_team_name } = matchData ?? teamsFallback;

  const date = matchData?.match_date ?? "2026-11-29T16:30:00.000Z";
  const { matchDate, time } = getMatchDate(date);
  const { homeRatio, awayRatio } = predictionsData;

  const { stats } = classes;

  return (
    <div className={stats.matchData}>
      <div className={stats.nextMatch}>
        <div className={stats.matchRow}>
          <div className={stats.matchTag}>Next match</div>
          {home_team_name.substring(0, 7)} vs {away_team_name.substring(0, 7)}
        </div>
        <div className={stats.matchRow}>
          <div className={stats.matchTag}>{matchDate}</div> {time}
        </div>
      </div>
      <div className={stats.stackedContainer}>
        <TeamPredictionChart
          teamName={home_team_name}
          winRate={homeRatio.winRate}
          total={homeRatio.total}
        />
      </div>
      <div className={stats.stackedContainer}>
        <TeamPredictionChart
          teamName={away_team_name}
          winRate={awayRatio.winRate}
          total={awayRatio.total}
        />
      </div>
    </div>
  );
}
