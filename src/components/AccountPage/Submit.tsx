import { useRecoilState } from "recoil";

import DateFilter from "../AccountPage/DateFilter";
import CategoryFilter from "../AccountPage/CategoryFilter";
import {
  startDateState,
  endDateState,
  checkedListState,
  isfilteredState,
} from "../../Recoil";
import { selectedExpenseDateState } from "../../Recoil/expenseRecord";

export default function SubmitForm() {
  const [, setStartDate] = useRecoilState(startDateState);
  const [, setEndDate] = useRecoilState(endDateState);
  const [, setList] = useRecoilState(checkedListState);
  const [, setisFiltered] = useRecoilState(isfilteredState);
  const [, setSelectedDateForGetData] = useRecoilState(
    selectedExpenseDateState
  );

  const handleFilterReset = () => {
    setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    setEndDate(new Date());
    setList([]);
    setisFiltered(false);
    setSelectedDateForGetData(new Date());
  };
  const setFilter = () => {
    setisFiltered(true);
  };

  return (
    <>
      <input type="checkbox" id="account_filter" className="modal-toggle" />
      <div className="modal w-full flex justify-center">
        <div className="w-11/12 h-5/6 bg-base-100 z-[999] py-4 shadow-lg text-neutral-600 relative">
          <div className="w-full flex flex-col items-center justify-around">
            <DateFilter />
            <CategoryFilter />
            <div className="flex justify-center items-center m-12">
              <label
                htmlFor="account_filter"
                onClick={setFilter}
                className="w-20 mr-5 btn btn-sm btn-accent text-base-100"
              >
                적용
              </label>
              <label
                htmlFor="account_filter"
                onClick={handleFilterReset}
                className="w-20 ml-5 btn btn-sm btn-accent text-base-100"
              >
                초기화
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
