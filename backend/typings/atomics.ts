export interface tokensInterface {
  access: string;
  refresh: string;
  username: string;
  id: string;
}

export interface CheckTokenResult {
  error: string | boolean;
  username: string | null;
  id: string | null;
}
