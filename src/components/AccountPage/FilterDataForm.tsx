import { useRecoilState } from "recoil";
import {
  checkedListState,
  endDateState,
  filterFormState,
  isSubmitState,
  startDateState,
} from "../../Recoil";

import { useEffect, useState } from "react";
import { addComma, getDayFunc } from "../../helpers/helper";
import { categoryList } from "../../constants/expenseCategory";
import { FiMeh } from "react-icons/fi";
import FilterBtn from "../AccountPage/FilterBtn";
import { useNavigate } from "react-router-dom";
import { ExpenseData, useTest } from "../../pages/AccountPage";

export const FilteredDataForm = () => {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate] = useRecoilState(endDateState);
  const [checkedList, setCheckedList] = useRecoilState(checkedListState);
  const [data, setData] = useState<ExpenseData[]>([]);
  const [, setFilterForm] = useRecoilState(filterFormState);
  const [, setIsSubmit] = useRecoilState(isSubmitState);
  const navigate = useNavigate();

  const start = `${startDate?.getFullYear()}/${
    Number(startDate?.getMonth()) + 1
  }/${startDate?.getDate()}`;
  const end = `${endDate?.getFullYear()}/${
    Number(endDate?.getMonth()) + 1
  }/${endDate?.getDate()}`;
  const today = new Date();

  const getUseData = async () => {
    try {
      const res = await useTest;
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterDate = data.filter((d) => {
    if (
      new Date(`${startDate}`) <= new Date(d.useDate) &&
      new Date(`${endDate}`) >= new Date(d.useDate) &&
      checkedList.length === 0
        ? d.category
        : checkedList?.includes(d.category)
    ) {
      return d.useDate;
    }
  });

  const totalAmount = filterDate.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  useEffect(() => {
    getUseData();
  }, []);

  const onClickRetry = () => {
    setFilterForm(true);
    setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setCheckedList([]);
  };
  const onClickClosed = () => {
    setIsSubmit(false);
    navigate("/test");
  };

  return (
    <>
      <div className="w-full  py-4 text-neutral-600">
        <div className=" w-11/12 ml-auto mr-auto flex flex-col items-center  ">
          <div className=" flex items-center mb-2  border-2 rounded-full p-2">
            <div>기간 :</div>

            <div className=" ml-2 flex items-center">
              {start} ~ {end}
            </div>
          </div>

          <div className="flex flex-start mt-2 mb-4 border-2 rounded-full p-2">
            <div>카테고리 :</div>
            {checkedList.length === 13 || checkedList.length === 0 ? (
              <div className="ml-1">전체</div>
            ) : (
              checkedList.map((el: string) => (
                <div key={el} className="ml-1">
                  {el}
                </div>
              ))
            )}
          </div>

          <div className="w-full flex flex-col justify-start">
            <div className="flex w-full justify-center mb-4 pb-2 border-b-4">
              <p className="w-1/4 ">총 지출</p>
              <span className="w-2/4">{addComma(totalAmount)}원</span>
            </div>
          </div>
        </div>
      </div>
      {filterDate.length > 0 ? (
        filterDate.map((d) => (
          <div key={d.recordId} className="w-full border p-4 mb-2">
            <div className="flex w-full justify-between mb-4 pb-2 border-b-4">
              <div>{getDayFunc(d.useDate, 2)}</div>
              <div className="mr-4">{addComma(d.amount)} 원</div>
            </div>
            <div className="flex items-center w-full">
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
                <div className="flex flex-col w-2/6 ml-2">
                  <div className="text-m">{d.paidFor}</div>
                  <div className="text-xs">{d.memo}</div>
                </div>
                <div className="w-1/6 text-center">{d.payType}</div>
                <div className="w-2/6 text-center">{addComma(d.amount)} 원</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center p-10 rounded-2xl mt-36 mb-10">
          <span>
            <FiMeh size={50} className="mr-4 text-accent" />
          </span>
          <p className="text-5xl text-accent">데이터가 없어요 </p>
        </div>
      )}
      <div className="flex justify-center">
        <FilterBtn onClick={onClickRetry}>다시 선택</FilterBtn>
        <button
          type="button"
          onClick={onClickClosed}
          className="w-32 btn btn-sm btn-accent text-base-100 "
        >
          닫기
        </button>
      </div>
    </>
  );
};
