export default interface MatchSeed {
  league: string;
  season: string;
  match_date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  home_result: "w" | "d" | "l";
  home_points: number;
  away_score: number;
  away_result: "w" | "d" | "l";
  away_points: number;
  game_week: number;
}
