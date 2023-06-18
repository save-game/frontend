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
export function getDayFunc(day: string, num: number) {
  const year = new Date(day).getFullYear().toString().substring(2);
  const month = new Date(day).getMonth() + 1;
  const date = new Date(day).getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const weekDay = week[new Date(day).getDay()];
  if (num === 1) {
    return `${year}년 ${month}월 지출`;
  } else {
    return `${month}월 ${date}일 ${weekDay}요일`;
  }
}

export const addComma = (price: number) => {
  const returnStr = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return returnStr;
};

export const addOneMonth = (date: Date) => {
  return new Date(
    `${date.getFullYear()}-${date.getMonth() + 2}-${date.getDate()}`
  );
};
