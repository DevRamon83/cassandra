import { sign } from "hono/jwt";
import { errors, scopes } from "../../shared/index.ts";

const parseExpiresIn = (timeStr: string): number => {
  const value = parseInt(timeStr, 10);
  const unit = timeStr.slice(-1);
  switch (unit) {
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return value;
  }
};

export const createToken = (
  username: string,
  id: string,
  expiresIn: string,
) => {
  const secret = Bun.env.SECRET;
  if (!secret) {
    console.error(scopes.backend.createToken, errors.missingSecret);
    return null;
  }

  const seconds = parseExpiresIn(expiresIn);
  const payload = {
    username,
    id,
    exp: Math.floor(Date.now() / 1000) + seconds,
  };

  return sign(payload, secret);
};
