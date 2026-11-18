import type { Dispatch, SetStateAction } from "react";
import type { PredictionData } from "../../../shared";

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
  predictions: PredictionUI[];
  setPredictions: Dispatch<SetStateAction<PredictionUI[]>>;
}
