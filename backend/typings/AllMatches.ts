export interface Match {
  away_points: number;
  away_result: string;
  away_score: number;
  away_team_id: string;
  away_team_name: string;
  game_week: number; // Corretto da 1 a number
  home_points: number; // Corretto da 1 a number
  home_result: string;
  home_score: number; // Corretto da 1 a number
  home_team_id: string;
  home_team_name: string;
  id: string;
  league: string;
  match_date: string;
  season: string;
}

export type AllMatches = Match[];
