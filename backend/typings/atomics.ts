export interface Tokens {
  access: string;
  refresh: string;
  username: string;
  id: string;
}

export interface CheckTokenResult {
  status: string;
  username: string | null;
  id: string | null;
}

export interface Status {
  success: boolean;
  error: string;
}

export interface TeamStats {
  home: boolean;
  GNG: boolean[];
  UO: boolean[];
}

export type TeamsMap = Map<string, TeamStats>;
