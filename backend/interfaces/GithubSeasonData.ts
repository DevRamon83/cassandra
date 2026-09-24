export default interface GithubSeasonData {
  name: string;
  matches: Array<{
    round: string;
    date: string;
    time: string;
    team1: string;
    team2: string;
    score?: {
      ht: number[];
      ft: number[];
    };
  }>;
}
