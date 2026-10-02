export interface SingleMatch {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score?: {
    ht: number[];
    ft: number[];
  };
}

export interface GithubSeasonData {
  name: string;
  matches: SingleMatch[];
}
