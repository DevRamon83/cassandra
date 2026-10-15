import { Context } from "@hono/hono";

export const handleErrorResponse = <T extends number>(
  c: Context,
  message: string,
  status: T,
  shouldLog: boolean,
) => {
  if (shouldLog) console.error(message);
  return c.json(
    { error: true, message },
    status as Parameters<typeof c.json>[1],
  );
};
