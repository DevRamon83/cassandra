export interface Match {
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

export type AllMatches = Match[];

export interface TeamStandings {
  played: number;
  w: number;
  l: number;
  d: number;
  scored: number;
  conceded: number;
  gd: number;
  points: number;
}

export type Rounds = Record<number, Record<string, Match>>;
export type Standings = Record<string, TeamStandings>;

export interface updateData {
  homeTeam: string;
  awayTeam: string;
  standings: Standings;
  match: Match;
}
