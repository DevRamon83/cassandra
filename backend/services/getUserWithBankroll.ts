import { client } from "../db.ts";
import { findUserQuery } from "../queries/findUserQuery.ts";
import type { User } from "../../shared/index.ts";

interface UserRow extends User {
  psw: string;
}

export const getUserWithBankroll = async (
  username: string,
): Promise<UserRow | null> => {
  const { text, value } = findUserQuery(username);
  const { rows } = await client.query<UserRow>(text, value);
  return rows.length > 0 ? rows[0] : null;
};
