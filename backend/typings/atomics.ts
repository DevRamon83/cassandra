export interface tokensInterface {
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
