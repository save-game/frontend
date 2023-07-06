import { useEffect, useState, useCallback, useRef } from "react";

import { GoTriangleLeft, GoTriangleRight } from "react-icons/Go";
import { useRecoilState } from "recoil";
import {
  checkedListState,
  endDateState,
  isfilteredState,
  startDateState,
} from "../../Recoil/index.js";
import { addComma, getDayFunc } from "../../helpers/helper.js";
import MonthPicker from "../../components/AccountPage/MonthPicker.js";
import AnalyzeForm from "../../components/AccountPage/AnalyzeForm.js";
import { categoryList } from "../../constants/expenseCategory.js";

import ExpenseFormButton from "../Expenses/ExpenseFormButton.js";
import { MonthPickerWrapper } from "../../styles/DateRange.js";
import { deleteExpense, getRecordedExpense } from "../../api/expenseAPI.js";
import { ExpenseRecord } from "../../interface/interface.js";
import NoDisplayData from "../Common/NoDisplayData.js";
import SubmitForm from "./Submit.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BsPencil, BsTrash } from "react-icons/Bs";
import Dropdown from "../Common/Dropdown.js";
import ConfirmModal from "../Common/ConfirmModal.js";
import {
  expenseRecordAtom,
  selectedExpenseDateState,
} from "../../Recoil/expenseRecord.js";
import { useNavigate } from "react-router-dom";
import ExpensesForm from "../Expenses/ExpensesForm.js";
import { FcPieChart } from "react-icons/Fc";

export default function Account() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFiltered, setisFilterd] = useRecoilState(isfilteredState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [categoryFilterList, setCategoryFilterList] =
    useRecoilState(checkedListState);
  const [selectedDateForGetData, setSelectedDateForGetData] =
    useRecoilState<Date>(selectedExpenseDateState);
  const [analyze, setAnalyze] = useState(false);
  const [expenseData, setExpenseData] = useState<ExpenseRecord[]>([]);
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<ExpenseRecord | null>(
    null
  );
  const [expenseForm, setExpenseForm] = useState(false);
  const [isRevision, setIsRevision] = useRecoilState(expenseRecordAtom);

  const getUseData = useCallback(async () => {
    try {
      const response = await getRecordedExpense(
        startDate?.toLocaleDateString("en-US") as string,
        endDate?.toLocaleDateString("en-US") as string
      );
      if (categoryFilterList.length === 0) {
        setExpenseData(response.data);
        return;
      }
      const filteredList = response.data.filter((v: ExpenseRecord) =>
        categoryFilterList.includes(v.category)
      );
      setExpenseData(filteredList);
    } catch (error) {
      console.error(`getUseData Error: Time(${new Date()}) ERROR ${error}`);
    }
  }, [startDate, endDate, categoryFilterList]);

  const { isLoading } = useQuery(["getExpenseData"], getUseData);

  const { mutate: expenseDeleteMutate } = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getExpenseData"]);
    },
  });

  useEffect(() => {
    getUseData();
  }, [getUseData]);

  const totalAmount = expenseData.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  const year = new Date(selectedDateForGetData).getFullYear();
  const prevMonth = new Date(selectedDateForGetData).getMonth();
  const nextMonth = new Date(selectedDateForGetData).getMonth() + 1;

  const onChangeMonth = (date: Date) => {
    setStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setEndDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  };

  const onClickPrev = () => {
    setSelectedDateForGetData(new Date(year, prevMonth - 1));
    setStartDate(new Date(year, prevMonth - 1, 1));
    setEndDate(new Date(year, prevMonth, 0));
  };
  const onClickNext = () => {
    setSelectedDateForGetData(new Date(year, nextMonth));
    setStartDate(new Date(year, nextMonth, 1));
    setEndDate(new Date(year, nextMonth + 1, 0));
  };
  const handleFilterReset = () => {
    setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    setEndDate(new Date());
    setSelectedDateForGetData(new Date());
    setCategoryFilterList([]);
    setisFilterd(false);
  };

  const handleRevision = (record: ExpenseRecord) => {
    setIsRevision(record);
    setExpenseForm(true);
  };

  const confirmDelete = (record: ExpenseRecord) => {
    if (!confirmDialogRef.current || !record) return;
    setSelectedRecord(record);
    confirmDialogRef.current.showModal();
  };

  const handleExpenseDelete = () => {
    if (!selectedRecord) return;
    expenseDeleteMutate(selectedRecord.recordId);
    setTimeout(() => {
      setStartDate(
        new Date(
          new Date(selectedRecord.useDate).getFullYear(),
          new Date(selectedRecord.useDate).getMonth(),
          1
        )
      );
      setEndDate(
        new Date(
          new Date(selectedRecord.useDate).getFullYear(),
          new Date(selectedRecord.useDate).getMonth() + 1,
          0
        )
      );
    }, 100);
    setSelectedDateForGetData(new Date(selectedRecord.useDate));
  };

  return (
    <main>
      <div className=" w-full px-2 ml-auto mr-auto flex flex-col items-center pt-4 pb-20">
        <div className=" w-full ml-auto mr-auto flex flex-col items-center mb-4">
          <div className="w-full flex flex-col items-center ">
            <div className="w-full flex justify-start items-center my-4 mt-5">
              <MonthPickerWrapper className="w-full flex items-center justify-start text-cyan-950">
                <GoTriangleLeft
                  size={22}
                  className="cursor-pointer hover:text-accent-focus"
                  onClick={onClickPrev}
                />
                <MonthPicker
                  selectedDate={selectedDateForGetData}
                  handleSelectedDate={onChangeMonth}
                />
                <GoTriangleRight
                  size={22}
                  className="cursor-pointer hover:text-accent"
                  onClick={onClickNext}
                />
              </MonthPickerWrapper>
            </div>
            {analyze ? (
              <AnalyzeForm analyze={setAnalyze} />
            ) : (
              <>
                <div className="w-full flex flex-col justify-start">
                  <div className="flex w-full justify-center items-center mb-3 p-1 ">
                    <div className="w-full h-12 flex justify-start items-center rounded-lg bg-base-100 font-semibold text-cyan-950 shadow">
                      <p className="w-1/6 ml-2 p-1 text-gray-500 bg-base-color text-sm text-center  rounded-lg">
                        지출
                      </p>
                      <span className="w-5/6  p-2 rounded-lg text-left ">
                        {addComma(totalAmount)}원
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAnalyze(true);
                      }}
                      className="w-1/4 ml-2 p-0 shrink-0 flex justify-center btn btn-ghost bg-emerald-50 hover:bg-teal-100  shadow"
                    >
                      <FcPieChart size={18} className="-mr-1" />
                      <p className="pt-0.5">분석</p>
                    </button>
                  </div>
                </div>
                <div className="flex justify-btween w-full mb-3">
                  <div className="w-1/2 mx-1">
                    <label
                      htmlFor="account_filter"
                      className="w-full btn btn-sm btn-neutral text-base-100 shadow"
                    >
                      필터선택
                    </label>
                  </div>
                  <SubmitForm />
                  <div className="w-1/2 mx-1">
                    <ExpenseFormButton size={"small"} />
                  </div>
                </div>

                <div className="w-full relative flex flex-col items-center">
                  {isFiltered ? (
                    <div className="w-full flex items-center bg-base-100 rounded-lg px-3 py-2 mb-3 shadow">
                      <div className="mr-auto">
                        <div className="flex text-cyan-950 font-bold indent-1">
                          <div className="text-sm">{`${startDate?.getFullYear()}.${
                            (startDate?.getMonth() as number) + 1
                          }.${startDate?.getDate()}`}</div>
                          <span className="mx-2">-</span>
                          <div className="text-sm">{`${endDate?.getFullYear()}.${
                            (endDate?.getMonth() as number) + 1
                          }.${endDate?.getDate()}`}</div>
                        </div>
                        <div>
                          {categoryFilterList.map((v, idx) =>
                            idx > 4 ? (
                              <></>
                            ) : (
                              <span
                                key={idx}
                                className="bg-emerald-200 text-xs rounded-md p-1 mr-1 shadow"
                              >
                                {v}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <button
                        className="btn btn-sm h-10 w-20 shadow"
                        onClick={handleFilterReset}
                      >
                        초기화
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {expenseData.length > 0 ? (
                    expenseData.map((d, idx) => (
                      <div
                        key={idx}
                        className="w-full bg-base-100 rounded-lg border p-3 mb-2"
                      >
                        <div className="flex w-full justify-between items-center mb-2 px-2 pb-0.5 border-b-4">
                          <div className="text-sm">
                            {getDayFunc(d.useDate, 2)}
                          </div>
                          <Dropdown>
                            <li className="text-xs w-20 px-0 ">
                              <div
                                onClick={() => handleRevision(d)}
                                className=" w-full mx-auto"
                              >
                                <BsPencil size="13" />
                                <p className="shrink-0">수정</p>
                              </div>
                            </li>
                            <li className="text-error text-xs w-20 px-0">
                              <div
                                onClick={() => confirmDelete(d)}
                                className="w-full mx-auto"
                              >
                                <BsTrash size="13" />
                                <p className="shrink-0">삭제</p>
                              </div>
                            </li>
                          </Dropdown>
                        </div>
                        <div className="flex items-center w-full pr-2">
                          <div className="flex items-center w-full">
                            {categoryList.map((list) => {
                              if (list.name === d.category) {
                                return (
                                  <div
                                    className="w-1/6 flex flex-col items-center justify-center"
                                    key={list.category}
                                  >
                                    <div
                                      className={`${list.color} w-9 h-9 mx-auto text-base-100 rounded-full flex justify-center items-center`}
                                    >
                                      {list.icon}
                                    </div>
                                    <p className="font-normal text-xs text-neutral-600 text-center mt-1">
                                      {list.name}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                            <div className="flex flex-col justify-center w-2/6 ml-2 pt-2">
                              <div className="text-m h-3/5 truncate text-[15px]">
                                {d.paidFor}
                              </div>
                              <div className="text-xs h-2/5 truncate">
                                {d.memo}
                              </div>
                            </div>
                            <div className="w-1/6 text-center text-black font-bold">
                              {d.payType === "카드" ? (
                                <span className="badge  text-base-100 bg-fuchsia-950 text-[11px] shadow-sm">
                                  카드
                                </span>
                              ) : (
                                <span className="badge text-base-100 bg-orange-600 text-[11px] text-xs shadow-sm">
                                  현금
                                </span>
                              )}
                            </div>
                            <div className="w-2/6 text-right text-[15px] text-black">
                              {d.amount.toLocaleString("ko-KR")} 원
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <NoDisplayData />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {expenseForm ? <ExpensesForm formEditor={setExpenseForm} /> : null}
        <ConfirmModal
          dialogRef={confirmDialogRef}
          confirm="정말로 삭제하시겠습니까?"
          onConfirm={handleExpenseDelete}
        />
      </div>
    </main>
  );
}
