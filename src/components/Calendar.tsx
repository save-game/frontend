import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import tw from "twin.macro";
import { DatePickerWrapper } from "../styles/Calendar";

const StyledDatePicker = styled(DatePicker)`
  ${tw`border border-neutral-400 outline-2 outline-neutral-400 rounded-lg w-full h-12 text-center`};
`;

export interface Props {
  readonly selectedDate: Date;
  readonly setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const Calendar = ({ selectedDate, setSelectedDate }: Props) => {
  return (
    <DatePickerWrapper>
      <StyledDatePicker
        dateFormat="yyyy.MM.dd"
        locale={ko}
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        onChangeRaw={(e) => e.preventDefault()}
        showPopperArrow={false}
      />
    </DatePickerWrapper>
  );
};

export default Calendar;
