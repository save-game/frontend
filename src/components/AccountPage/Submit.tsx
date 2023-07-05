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
import { IoCloseOutline } from "react-icons/Io5";

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
        <div className="w-11/12 h-5/6 bg-base-100 z-[999] py-4 rounded-lg shadow-lg text-neutral-700 relative">
          <label htmlFor="account_filter" className="absolute top-5 right-5">
            <IoCloseOutline size={26} />
          </label>
          <div className="w-full flex flex-col items-center justify-around">
            <DateFilter />
            <CategoryFilter />
            <div className="w-11/12 flex justify-center items-center m-12">
              <div className="w-1/2 ml-1 mr-2">
                <label
                  htmlFor="account_filter"
                  onClick={handleFilterReset}
                  className="w-full btn btn-sm btn-outline 0"
                >
                  초기화
                </label>
              </div>
              <div className="w-1/2 ml-2 mr-1">
                <label
                  htmlFor="account_filter"
                  onClick={setFilter}
                  className="w-full btn btn-sm btn-neutral text-base-100"
                >
                  적용
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
