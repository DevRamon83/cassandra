const placeholdersHelper = (length: number, base: number) => {
  let string = "(";

  for (let i = 0; i < length; i++) {
    string += `$${base + i + 1}`;

    string += i !== length - 1 ? ", " : "";
  }

  string += ")";
  return string;
};

export const getPlaceholder = (data: unknown[][], offset = 0): string => {
  return data
    .map((row, index) => {
      const base = offset + index * row.length;
      return placeholdersHelper(row.length, base);
    })
    .join(",\n");
};
