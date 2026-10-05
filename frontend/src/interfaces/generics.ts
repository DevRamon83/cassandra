import type {
  RoundsType,
  StandingsType,
} from "../../../shared/typings/AllMatches";

export interface StandardResponse {
  status: number;
  error: boolean;
  errorMessage?: string;
}

export interface LeagueResponse {
  error: boolean;
  standings: StandingsType;
  rounds: RoundsType;
  aborted: true;
}
