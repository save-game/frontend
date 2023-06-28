import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import tw from "twin.macro";
import { Props } from "../Common/Calendar";

const StyledDatePicker = styled(DatePicker)`
  color: transparent;
  text-shadow: 0 0 0 black;
  ${tw`rounded-lg text-center focus:outline-none`};
`;

const MonthPicker = ({ selectedDate, handleSelectedDate }: Props) => {
  registerLocale("ko", ko);
  return (
    <div className=" flex items-center">
      <StyledDatePicker
        id="dp"
        className="w-32 h-6 ml-1 text-center cursor-pointer"
        selected={selectedDate}
        locale="ko"
        shouldCloseOnSelect
        onChange={(date: Date) => handleSelectedDate(date)}
        dateFormat="yyyy년 MM월"
        showMonthYearPicker
        onChangeRaw={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default MonthPicker;
