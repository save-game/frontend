export const dDayCalculator = (date: string) => {
  const today = new Date();
  const endDate = new Date(date);
  const timeDiff = endDate.getTime() - today.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  return daysDiff;
};

export function getDay(day: string, num: number) {
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
  let returnStr = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return returnStr;
};
