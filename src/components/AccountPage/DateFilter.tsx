import { useState } from "react";
import DatePicker from "react-datepicker";
import { DateRangePickerWrapper } from "../../styles/DateRange";
import { ko } from "date-fns/esm/locale";
import { useRecoilState } from "recoil";
import { endDateState, startDateState } from "../../Recoil";

const DateFilter = () => {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [datePick, setDatePick] = useState(false);
  const [period, setPeriod] = useState("기간선택");
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  const onClickMonth = () => {
    setStartDate(new Date(currentYear, currentMonth - 1, currentDay));
    setEndDate(currentDate);
    setPeriod("최근 한달 간");
  };
  const onClickThreeMonth = () => {
    setStartDate(new Date(currentYear, currentMonth - 3, currentDay));
    setEndDate(currentDate);
    setPeriod("최근 3개월");
  };
  const onClickSixMonth = () => {
    setStartDate(new Date(currentYear, currentMonth - 6, currentDay));
    setEndDate(currentDate);
    setPeriod("최근 6개월");
  };
  const onClickMyPick = () => {
    setStartDate(currentDate);
    setEndDate(currentDate);
    setPeriod("직접 선택");
  };

  return (
    <div className="m-20 h-16">
      <div>
        <div
          id="period"
          className="flex flex-col text-center cursor-pointer"
          onClick={() => setDatePick(!datePick)}
        >
          <button className="btn btn-outline  w-full shadow-md">
            {period}
          </button>
        </div>
        <div
          onClick={() => {
            setDatePick(false);
          }}
          className={`${
            datePick ? "" : "hidden"
          } fixed flex flex-col justify-center items-center z-50 bg-white border w-64 right-1/4 mt-1`}
        >
          <input
            id="thisMonth"
            type="radio"
            name="radio-date"
            className="radio hidden peer/thisMonth"
          />
          <label
            className="pt-1 w-full text-center peer-checked/thisMonth:text-white peer-checked/thisMonth:bg-accent hover:bg-accent hover:opacity-50"
            htmlFor="thisMonth"
            onClick={onClickMonth}
          >
            최근 한달 간
          </label>
          <input
            id="threeMonth"
            type="radio"
            name="radio-date"
            className="radio hidden peer/threeMonth"
          />
          <label
            className="pt-1 w-full text-center peer-checked/threeMonth:text-white peer-checked/threeMonth:bg-accent hover:bg-accent hover:opacity-50"
            htmlFor="threeMonth"
            onClick={onClickThreeMonth}
          >
            최근 3개월
          </label>
          <input
            id="sixMonth"
            type="radio"
            name="radio-date"
            className="radio hidden peer/sixMonth"
          />
          <label
            className=" pt-1 w-full text-center peer-checked/sixMonth:text-white peer-checked/sixMonth:bg-accent hover:bg-accent hover:opacity-50"
            htmlFor="sixMonth"
            onClick={onClickSixMonth}
          >
            최근 6개월
          </label>
          <input
            id="myPick"
            type="radio"
            name="radio-date"
            className="radio hidden peer/myPick"
          />
          <label
            className="pt-1 w-full text-center peer-checked/myPick:text-white peer-checked/myPick:bg-accent hover:bg-accent hover:opacity-50"
            htmlFor="myPick"
            onClick={onClickMyPick}
          >
            직접 선택
          </label>
        </div>
      </div>
      <DateRangePickerWrapper className="flex justify-center items-center pt-10 w-full ">
        <DatePicker
          className="w-28 text-center"
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          onChangeRaw={(e) => e.preventDefault()}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale={ko}
        />
        <div className="mr-2 ml-2"> - </div>
        <DatePicker
          className="w-28 text-center"
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          onChangeRaw={(e) => e.preventDefault()}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          locale={ko}
        />
      </DateRangePickerWrapper>
    </div>
  );
};
export default DateFilter;
