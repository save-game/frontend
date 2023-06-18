import "react-datepicker/dist/react-datepicker.css";
import tw, { styled } from "twin.macro";

export const DatePickerWrapper = styled.div`
  .react-datepicker {
    font-family: inherit;
    ${tw`bg-light-color shadow-lg p-3 text-[11px]`};
  }
  .react-datepicker-popper {
    left: 50% !important;
    transform: translateX(-50%) translateY(-59px) !important;
  }

  .react-datepicker__header {
    ${tw`bg-light-color border-none`}
  }

  .react-datepicker__navigation {
    ${tw`top-3`}
  }

  .react-datepicker__current-month {
    ${tw`mb-2`}
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day {
    ${tw`text-neutral-500`}
  }

  .react-datepicker__day--selected {
    ${tw`text-base-100 bg-accent rounded-full`}
  }

  .react-datepicker__day--keyboard-selected {
    ${tw`bg-medium-color rounded-full`}
  }

  .react-datepicker__day--outside-month {
    ${tw`text-neutral-300`}
  }

  .react-datepicker__day--in-selecting-range {
    ${tw`text-base-100 bg-accent rounded-full`}
  }
`;
