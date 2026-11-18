import type { Match, PredictionData } from "../../shared";
import type { TeamsMap, TeamStats } from "../typings/atomics";

interface Data {
  error: boolean;
  map: TeamsMap;
  roundToPredict: Record<string, Match>;
}

type Outcome = {
  outcome: string;
  accuracy: number;
  steps: number;
} | null;

const seasonAccuracy = (ratio: number) => {
  if (ratio < 1.4) return 0.3;
  if (ratio < 1.7) return 0.6;
  return 0.9;
};

const defineAccuracy = (value: number, steps: number) => {
  const accuracy = value / steps;
  if (accuracy <= 0.3) return "low";
  if (accuracy <= 0.6) return "medium";
  return "high";
};

const getHomeAwayOutcome = (
  homeRatio: number,
  event1: string,
  awayRatio: number,
  event2: string,
) => {
  let homeEventOutcome;
  let awayEventOutcome;

  if (homeRatio >= 0.6) {
    homeEventOutcome = event1;
  } else if (homeRatio <= 0.4) {
    homeEventOutcome = event2;
  }

  if (awayRatio >= 0.6) {
    awayEventOutcome = event1;
  } else if (awayRatio <= 0.4) {
    awayEventOutcome = event2;
  }

  return { homeEventOutcome, awayEventOutcome };
};

interface Tracker {
  steps: number;
  accuracy: number;
}

const updateTracker = (
  tracker: Tracker,
  outcomeData: Outcome,
  outcomeEvent: string,
  tail: string,
) => {
  let outcomeConfirm = false;
  const bonusValue = tail === "short" ? 0.1 : 0.2;
  const outcomeBonusStep = tail === "short" ? 1 : 0.75;
  const outcomePenaltyStep = tail === "short" ? 1.25 : 1.5;

  if (outcomeData) {
    outcomeConfirm = outcomeData.outcome === outcomeEvent;
    const bonus = outcomeConfirm ? bonusValue : -bonusValue;
    tracker.accuracy += bonus;
  }

  if (outcomeConfirm && outcomeData) {
    tracker.accuracy += outcomeData.accuracy;
    tracker.steps += outcomeBonusStep;
  } else {
    tracker.steps += outcomePenaltyStep;
  }
};

const defineOutcome = (
  homeArray: boolean[],
  awayArray: boolean[],
  event: string[],
) => {
  const totalHome = homeArray.length;
  const totalAway = awayArray.length;
  const homeOutcome = homeArray.filter((value) => value).length;
  const awayOutcome = awayArray.filter((value) => value).length;
  const homeRatio = homeOutcome / totalHome;
  const awayRatio = awayOutcome / totalAway;
  const event1 = event[0];
  const event2 = event[1];
  const tracker = { steps: 1, accuracy: 0 };

  const { homeEventOutcome, awayEventOutcome } = getHomeAwayOutcome(
    homeRatio,
    event1,
    awayRatio,
    event2,
  );

  if (!homeEventOutcome || !awayEventOutcome) return null;
  if (homeEventOutcome !== awayEventOutcome) return null;

  const isEvent1 = homeEventOutcome === event1;
  const realHomeRatio = isEvent1 ? homeRatio : 1 - homeRatio;
  const realAwayRatio = isEvent1 ? awayRatio : 1 - awayRatio;

  tracker.accuracy = seasonAccuracy(realHomeRatio + realAwayRatio);

  if (totalHome <= 5) {
    return {
      outcome: homeEventOutcome,
      accuracy: tracker.accuracy,
      steps: tracker.steps,
    };
  }

  const lastThreeHome = homeArray.slice(-3);
  const lastThreeAway = awayArray.slice(-3);
  const shortTail: Outcome = defineOutcome(lastThreeHome, lastThreeAway, event);

  updateTracker(tracker, shortTail, homeEventOutcome, "short");

  if (totalHome <= 8) {
    return {
      outcome: homeEventOutcome,
      accuracy: tracker.accuracy,
      steps: tracker.steps,
    };
  }

  const lastFiveHome = homeArray.slice(-5);
  const lastFiveAway = awayArray.slice(-5);
  const longTail: Outcome = defineOutcome(lastFiveHome, lastFiveAway, event);
  updateTracker(tracker, longTail, homeEventOutcome, "long");

  return {
    outcome: homeEventOutcome,
    accuracy: tracker.accuracy,
    steps: tracker.steps,
  };
};

const definePrediction = (homeData: TeamStats, awayData: TeamStats) => {
  const GNGArray = ["goal", "no_goal"];
  const UOArray = ["under", "over"];
  const GNGOutcome = defineOutcome(homeData.GNG, awayData.GNG, GNGArray);
  const UOOutcome = defineOutcome(homeData.UO, awayData.UO, UOArray);
  if (!GNGOutcome && !UOOutcome) return null;

  let GNGAccuracy = 0;
  let UOAccuracy = 0;

  if (GNGOutcome) {
    GNGAccuracy = GNGOutcome.accuracy / GNGOutcome.steps;
  }

  if (UOOutcome) {
    UOAccuracy = UOOutcome.accuracy / UOOutcome.steps;
  }

  if (UOAccuracy >= GNGAccuracy && UOAccuracy > 0) {
    return {
      prediction: UOOutcome!.outcome,
      accuracy: defineAccuracy(UOOutcome!.accuracy, UOOutcome!.steps),
    };
  }

  if (GNGAccuracy > UOAccuracy && GNGAccuracy > 0) {
    return {
      prediction: GNGOutcome!.outcome,
      accuracy: defineAccuracy(GNGOutcome!.accuracy, GNGOutcome!.steps),
    };
  }

  return null;
};

export const getPredictions = (data: Data) => {
  const { map, roundToPredict } = data;
  const keys = Object.keys(roundToPredict);
  const predictionArray: PredictionData[] = [];

  for (const key of keys) {
    const match = roundToPredict[key];
    const predictionObj: PredictionData = {
      match_id: key,
      prediction: null,
      prediction_result: null,
      prediction_accuracy: null,
    };
    const homeTeam = match.home_team_name;
    const awayTeam = match.away_team_name;
    const homeData = map.get(homeTeam)!;
    const awayData = map.get(awayTeam)!;
    const predictions = definePrediction(homeData, awayData);
    if (predictions) {
      predictionObj.prediction = predictions.prediction;
      predictionObj.prediction_accuracy = predictions.accuracy;
    }

    predictionArray.push(predictionObj);
  }

  return predictionArray;
};
