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
    if (!matchData) return { myPrediction: [], homeRatio: {}, awayRatio: {} };
    const myPrediction = allPredictions
      .filter((prediction) => prediction.prediction_result === null)
      .filter((current) => current.match_id === matchData.id);

    const { homePredictions, awayPredictions } = predictionsHistory(
      allPredictions,
      league,
      matchData.home_team_name,
      matchData.away_team_name,
    );

    const homeRatio = getPredictionRatio(homePredictions);
    const awayRatio = getPredictionRatio(awayPredictions);

    return { myPrediction, homeRatio, awayRatio };
  }, [matchData, league]);

  const teamsFallback = { away_team_name: "", home_team_name: "" };

  const { away_team_name, home_team_name } = matchData ?? teamsFallback;

  const date = matchData?.match_date ?? "2026-11-29T16:30:00.000Z";
  const { matchDate, time } = getMatchDate(date);
  const { myPrediction, homeRatio, awayRatio } = predictionsData;

  const { stats } = classes;

  return (
    <div className={stats.matchData}>
      <div className="stats__nextMatch">
        <div className="stats__matchRow">
          <div className="stats__matchTag">Next match</div>
          {home_team_name.substring(0, 7)} vs {away_team_name.substring(0, 7)}
        </div>
        <div className="stats__matchRow">
          <div className="stats__matchTag">{matchDate}</div> {time}
        </div>
        <div>
          {myPrediction.length > 0 ? (
            <>
              <div className="stats__matchPrediction">
                <img src="/logo.svg" /> {myPrediction[0].prediction}
                <div
                  className={`stats__prediction-${myPrediction[0].prediction_accuracy}`}
                />
              </div>
            </>
          ) : (
            <div className="stats__matchRow-zeroPrediction">
              No prediction for this match
            </div>
          )}
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
