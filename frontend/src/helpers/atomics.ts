export const getRowClass = (
  index: number,
  eventClass: string,
  oddClass: string,
) => {
  return index % 2 === 0 ? eventClass : oddClass;
};
