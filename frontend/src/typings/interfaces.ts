import type { Dispatch, SetStateAction } from "react";
import type {
  leagues,
  Match,
  PredictionData,
  SingleBet,
  User,
} from "../../../shared";

export interface PagesInterface {
  url: string;
  alt: string;
  title: string;
  className: string;
  src: string;
  end: boolean;
}

export interface AuthError {
  username: string[] | undefined;
  psw: string[] | undefined;
  endpoint: string[] | undefined;
}

export interface PredictionDB extends PredictionData {
  id: string;
}

export interface PredictionUI extends PredictionData {
  id: string;
  match: string;
  league: string;
  gameWeek: number;
  date: string;
}

export interface PredictionContextType {
  predictions: PredictionUI[] | null;
  setPredictions: Dispatch<SetStateAction<PredictionUI[] | null>>;
}

export interface AuthContextType {
  auth: User | null;
  setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

type LeagueKey = (typeof leagues)[number];

export type BetPool = Partial<Record<LeagueKey, Record<string, string>>>;

export interface BetSlipPool {
  uuid: string;
  odds: string;
  id: string;
  homeTeam: string;
  awayTeam: string;
}

export interface BetsContextType {
  userBets: SingleBet[] | null;
  setUserBets: React.Dispatch<React.SetStateAction<SingleBet[] | null>>;
}

export type PredictionsMap = Map<number, PredictionUI[]>;

export type StatsCounts = {
  goal: number;
  noGoal: number;
  under: number;
  over: number;
  allSame?: {
    gameWeeks: number[];
    outcomes: string[];
  };
};

export interface TeamMatches {
  home: Match[];
  away: Match[];
  all: Match[];
}

export type PredictionsData = {
  myPrediction: PredictionUI[];
  homeRatio: Record<string, number>;
  awayRatio: Record<string, number>;
};
