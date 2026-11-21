export const notAString = (text: unknown, tag: string): boolean => {
  if (typeof text !== "string") {
    console.error(tag, text, ": is not a string");
    return true;
  }
  return false;
};

export const notANum = (value: unknown) => {
  if (typeof value !== "number") return true;
  if (Number.isNaN(value)) return true;
  return false;
};

export const isPositiveNum = (value: number) => value > 0;
