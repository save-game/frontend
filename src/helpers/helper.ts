export const dDayCalculator = (date: string) => {
  const today = new Date();
  const endDate = new Date(date);
  const timeDiff = endDate.getTime() - today.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  return daysDiff;
};
