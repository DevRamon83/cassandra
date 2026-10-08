export const getCurrentSeason = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const earlySeason = [7, 8, 9, 10, 11, 12];
  if (earlySeason.includes(currentMonth)) {
    return `${currentYear}/${currentYear + 1}`;
  }
  return `${currentYear - 1}/${currentYear}`;
};
