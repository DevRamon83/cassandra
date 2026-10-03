export interface MatchInterface {
  away_points: number | null;
  away_result: string | null;
  away_score: number | null;
  away_team_id: string;
  away_team_name: string;
  game_week: number;
  home_points: number | null;
  home_result: string | null;
  home_score: number | null;
  home_team_id: string;
  home_team_name: string;
  id: string;
  league: string;
  match_date: string;
  season: string;
}

export type AllMatchesType = MatchInterface[];

export interface TeamStandingsInterface {
  played: number;
  w: number;
  l: number;
  d: number;
  scored: number;
  conceded: number;
  gd: number;
  points: number;
}

export type RoundsType = Record<number, Record<string, MatchInterface>>;
export type StandingsType = Record<string, TeamStandingsInterface>;

export interface updateDataInterface {
  homeTeam: string;
  awayTeam: string;
  standings: StandingsType;
  match: MatchInterface;
}
