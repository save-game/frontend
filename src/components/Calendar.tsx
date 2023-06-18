import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import tw from "twin.macro";
import { DatePickerWrapper } from "../styles/Calendar";

import { RangeCalendarProps } from "../interface/interface";

const StyledDatePicker = styled(DatePicker)`
  ${tw`border border-neutral-400 outline-2 outline-neutral-400 rounded-lg w-full h-12 text-center`};
`;

export interface Props {
  readonly selectedDate: Date;
  readonly handleSelectedDate: (date: Date) => void;
}

const Calendar = ({ selectedDate, handleSelectedDate }: Props) => {
  return (
    <DatePickerWrapper>
      <StyledDatePicker
        dateFormat="yyyy.MM.dd"
        locale={ko}
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date: Date) => handleSelectedDate(date)}
        onChangeRaw={(e) => e.preventDefault()}
        showPopperArrow={false}
      />
    </DatePickerWrapper>
  );
};

export const RangeCalendarStart = ({
  startDate,
  endDate,
  handleSelectedDate,
}: RangeCalendarProps) => {
  return (
    <>
      <DatePickerWrapper>
        <StyledDatePicker
          dateFormat="yyyy.MM.dd"
          locale={ko}
          shouldCloseOnSelect
          selectsStart
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={(date: Date) => handleSelectedDate(date)}
          maxDate={endDate}
        />
      </DatePickerWrapper>
    </>
  );
};

export const RangeCalendarEnd = ({
  startDate,
  endDate,
  handleSelectedDate,
}: RangeCalendarProps) => {
  return (
    <DatePickerWrapper>
      <StyledDatePicker
        dateFormat="yyyy.MM.dd"
        locale={ko}
        shouldCloseOnSelect
        selectsEnd
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        onChange={(date: Date) => handleSelectedDate(date)}
        minDate={startDate}
      />
    </DatePickerWrapper>
  );
};

export default Calendar;
