export interface PagesInterface {
  url: string;
  alt: string;
  title: string;
  className: string;
  src: string;
  end: boolean;
}

export interface AuthError {
  username: string[] | undefined;
  psw: string[] | undefined;
  endpoint: string[] | undefined;
}
