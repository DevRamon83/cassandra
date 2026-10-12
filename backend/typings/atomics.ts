export interface tokensInterface {
  access: string;
  refresh: string;
  username: string;
}

export interface CheckTokenResult {
  error: string | boolean;
  username: string | null;
}
