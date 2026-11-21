import { createContext } from "react";
import type {
  AuthContextType,
  PredictionContextType,
  BetsContextType,
} from "../typings/interfaces";

export const LeaguesContext = createContext<any>(null);

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export const PredictionContext = createContext<PredictionContextType>({
  predictions: null,
  setPredictions: () => {},
});

export const BetsContext = createContext<BetsContextType>({
  userBets: null,
  setUserBets: () => {},
});
