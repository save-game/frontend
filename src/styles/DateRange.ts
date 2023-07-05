import "react-datepicker/dist/react-datepicker.css";
import tw, { styled } from "twin.macro";

export const DateRangePickerWrapper = styled.div`
  .react-datepicker {
    font-family: inherit;
    ${tw`bg-light-color shadow-lg p-3 text-[11px]`};
  }

  .react-datepicker__header {
    ${tw`bg-light-color border-none `}
  }

  .react-datepicker__navigation {
    ${tw`top-5`}
  }

  .react-datepicker__current-month {
    ${tw`mb-2`}
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    ${tw`text-neutral-500`}
  }
  .react-datepicker__day--in-range {
    ${tw`bg-accent opacity-50`}
  }

  .react-datepicker__day--selected {
    ${tw`text-base-100 opacity-100 rounded-full`}
  }

  .react-datepicker__day--keyboard-selected {
    ${tw`bg-medium-color rounded-full`}
  }

  .react-datepicker__day--outside-month {
    ${tw`text-neutral-300`}
  }
  .react-datepicker-wrapper {
    ${tw`w-36 text-center`}
  }
  .react-datepicker__input-container {
    ${tw` w-32 border rounded-full bg-slate-100 py-1 shadow`}
  }
`;

export const MonthPickerWrapper = styled.div`
  .react-datepicker {
    font-family: inherit;
    ${tw`bg-light-color shadow-lg p-3 text-[11px]`};
  }

  .react-datepicker__header {
    ${tw`bg-light-color border-none `}
  }

  .react-datepicker__navigation {
    ${tw`top-5`}
  }

  .react-datepicker__current-month {
    ${tw`mb-2`}
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    ${tw`text-neutral-500`}
  }

  .react-datepicker__day--keyboard-selected {
    ${tw`bg-medium-color rounded-full`}
  }

  .react-datepicker__day--outside-month {
    ${tw`text-neutral-300`}
  }
  .react-datepicker-wrapper {
    ${tw`w-28 text-center`}
  }
`;
