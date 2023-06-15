export const dDayCalculator = (date: string) => {
  const today = new Date();
  const endDate = new Date(date);
  const timeDiff = endDate.getTime() - today.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  return daysDiff;
};

export const dateRangeCalculator = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  const dateRange = [];
  for (let i = 0; i < daysDiff; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dateRange.push(date.toLocaleDateString("en-US"));
  }
  return dateRange;
};
