import { getPlaceholder } from "../helpers/getPlaceholder.ts";

export const authQuery = (username: string, psw: string) => {
  const matrix = [[username, psw]];
  const placeholders = getPlaceholder(matrix);

  const sqlQuery = `
INSERT INTO users (username, psw) 
VALUES ${placeholders}
ON CONFLICT (username) DO NOTHING;
`;

  return {
    text: sqlQuery,
    values: matrix.flat(),
  };
};
