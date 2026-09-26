export const notAString = (team: unknown, tag: string): boolean => {
  if (typeof team !== "string") {
    console.error(tag, team, ": is not a string");
    return true;
  }
  return false;
};
