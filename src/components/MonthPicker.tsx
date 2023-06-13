import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Props } from "./Calendar";

const MonthPicker = ({ selectedDate, setSelectedDate }: Props) => {
  registerLocale("ko", ko);
  return (
    <div className=" flex items-center">
      <SlArrowLeft className="ml-1" />
      <DatePicker
        id="dp"
        className="w-32 h-6 ml-1 text-center"
        selected={selectedDate}
        locale="ko"
        shouldCloseOnSelect
        onChange={(date: Date) => setSelectedDate(date)}
        dateFormat="yyyy년 MM월"
        showMonthYearPicker
        onChangeRaw={(e) => e.preventDefault()}
      />
      <SlArrowRight />
    </div>
  );
};

export default MonthPicker;
