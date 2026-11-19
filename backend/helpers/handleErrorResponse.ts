import type { Context } from "hono";
import { errors } from "../../shared";

export const handleErrorResponse = <T extends number>(
  c: Context,
  message: string,
  status: T,
  shouldLog: boolean,
) => {
  if (shouldLog) console.error(message);
  const errorFallback = shouldLog ? errors.invalidStandard : message;
  return c.json(
    { error: true, errorFallback },
    status as Parameters<typeof c.json>[1],
  );
};
