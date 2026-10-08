import { Context } from "@hono/hono";

export const handleErrorResponse = <T extends number>(
  c: Context,
  message: string,
  status: T,
) => {
  console.error(message);
  return c.json(
    { error: true, errorMsg: message },
    status as Parameters<typeof c.json>[1],
  );
};
