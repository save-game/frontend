import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InformModal from "../Common/InformModal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { BiWon } from "react-icons/Bi";
import { IoCloseOutline } from "react-icons/Io5";
import Calendar from "../Common/Calendar";
import { Category, categoryList } from "../../constants/expenseCategory";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-600 font-bold text-sm`}
`;

const ErrorNotice = styled.p`
  ${tw`h-5 text-[11px] text-error font-light text-right`}
`;

interface ExpensesFormProps {
  formEditor: Dispatch<SetStateAction<boolean>>;
}

const ExpensesForm = ({ formEditor }: ExpensesFormProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectModal, setSelectModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const expenseSchema = Yup.object({
    amount: Yup.string()
      .transform((value) => value.replace(/,/g, ""))
      .test("minimum", "금액은 0 이상의 숫자를 입력해주세요.", (value) => {
        const valueInNumber = Number(value);
        return valueInNumber > 0;
      })
      .test("maximum", "금액은 9자리 이내의 숫자로 입력해주세요.", (value) => {
        const valueInNumber = Number(value);
        return valueInNumber < 999999999;
      })
      .required("지출금액을 입력해주세요."),
    payType: Yup.string().required("카드나 현금 중 선택해주세요."),
    category: Yup.string().required("카테고리를 선택해주세요."),
    paidFor: Yup.string().required("거래처를 입력해주세요."),
    useDate: Yup.string().required("사용날짜를 선택해주세요."),
    memo: Yup.string().max(20, "20자 이내로 작성해주세요."),
  });
  type ExpensesFormData = Yup.InferType<typeof expenseSchema>;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit: onSubmit,
    setValue,
    control,
    reset,
  } = useForm<ExpensesFormData>({
    resolver: yupResolver(expenseSchema),
    mode: "onSubmit",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const valueInNumber = Number(inputValue.replace(/,/g, ""));
    if (Number.isNaN(valueInNumber)) {
      return;
    }
    const formattedValue = valueInNumber.toLocaleString("ko-KR");
    setValue("amount", formattedValue);
  };

  const handleSelectCategory = (item: Category) => {
    setSelectedCategory(item);
    setValue("category", item.category);
    setSelectModal(false);
  };

  const handleDate = (date: Date) => {
    setSelectedDate(date);
    const stringDate = selectedDate.toLocaleDateString("en-US");
    setValue("useDate", stringDate);
  };

  const handleClose = () => {
    formEditor(false);
    reset();
    setSelectedCategory(null);
  };

  const handleExpenseSubmit = (formdata: ExpensesFormData) => {
    console.log(formdata);
    if (!dialogRef.current) return;
    //amount는 숫자로 바꿔서 서버로 보내야함
    //날짜 포맷 확인 필요

    //서버에 지출등록
    // const { data } = await axios.post(
    //   "http://13.124.58.137/record",
    //   {
    //     amount: 10000,
    //     category: "FOOD",
    //     memo: "메모",
    //     paidFor: "식당",
    //     payType: "CARD",
    //     useDate: "6/24/2023",
    //   }
    //   // {
    //   //   headers: {
    //   //     Authorization:
    //   //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3NjA4NTIxfQ.gpPDNP5lCSk_ASPXsgyFSvtDA0OGkevyHygUhAFu-UM",
    //   //     Refreshtoken:
    //   //       "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODgyMTE1MjF9.l1UMkaEHfF8qdz4jzooFdgz9j3QpIL0KfmmARsGAjW4",
    //   //   },
    //   // }
    // );
    // console.log(data);
    //onsuccess에
    // reset();

    dialogRef.current.showModal();
    setTimeout(() => {
      if (!dialogRef.current) return;
      dialogRef.current.close();

      navigate("/account");
    }, SHOW_MODAL_DELAY);
  };

  //

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-base-100 z-[999] py-4 shadow-lg text-neutral-600 ">
      <Container>
        <form
          onSubmit={onSubmit(handleExpenseSubmit)}
          className="flex flex-col space-y-0.5"
        >
          <div className="relative">
            <div className="mb-1 indent-2">지출금액</div>
            <input
              type="text"
              autoFocus
              maxLength={12}
              autoComplete="off"
              className="border border-neutral-400 outline-2 outline-neutral-400 rounded-lg w-full h-12 pr-4 text-right"
              {...register("amount")}
              onChange={handleInputChange}
            />
            <span className="absolute left-4 top-10 text-accent">
              <BiWon size={18} />
            </span>
            <ErrorNotice>{errors?.amount?.message ?? null}</ErrorNotice>
          </div>
          <div className="relative">
            <div className="mb-1 indent-2">결제수단</div>
            <div className="flex justify-center items-center text-neutral-400">
              <input
                type="radio"
                id="card"
                value="card"
                className="peer/card hidden"
                {...register("payType")}
              />
              <label
                htmlFor="card"
                className="peer-checked/card:bg-light-color peer-checked/card:text-neutral-600 w-1/2 h-12 border border-r-[0.4px] border-neutral-400 rounded-l-xl flex justify-center items-center"
              >
                카드
              </label>
              <input
                type="radio"
                id="cash"
                value="cash"
                className="peer/cash hidden"
                {...register("payType")}
              />
              <label
                htmlFor="cash"
                className="peer-checked/cash:bg-light-color peer-checked/cash:text-neutral-600 w-1/2 h-12 border border-l-[0.4px] border-neutral-400 rounded-r-xl flex justify-center items-center"
              >
                현금
              </label>
            </div>
            <ErrorNotice>{errors?.payType?.message ?? null}</ErrorNotice>
          </div>
          <div className="relative">
            <div className="mb-1 indent-2">카테고리</div>
            <div
              onClick={() => setSelectModal(true)}
              className={`${
                selectModal
                  ? `outline outline-[1.5px] outline-neutral-400`
                  : null
              } h-14 border border-neutral-400 text-neutral-400 rounded-lg w-full flex justify-center items-center`}
            >
              {selectedCategory ? (
                <div>
                  <div
                    className={`${selectedCategory.color} w-9 h-9 mx-auto text-base-100 rounded-full flex justify-center items-center`}
                  >
                    {selectedCategory.icon}
                  </div>
                  <p className="font-normal text-xs text-neutral-600 text-center">
                    {selectedCategory.name}
                  </p>
                </div>
              ) : (
                <p>선택</p>
              )}
            </div>
            {selectModal ? (
              <div className="absolute z-50 mt-0.5 bg-light-color w-full pt-4 pb-10 grid-cols-5 rounded-lg shadow-xl">
                {categoryList.map((item) => (
                  <div
                    key={item.category}
                    className="inline-block w-1/5 py-2 px-2"
                  >
                    <Controller
                      name="category"
                      control={control}
                      render={() => (
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(item)}
                          className="btn btn-ghost hover:bg-transparent w-full p-0 block mb-1"
                        >
                          <div
                            className={`${item.color} w-4/5 mx-auto text-base-100 mb-1 flex justify-center items-center h-10 rounded-full`}
                          >
                            {item.icon}
                          </div>
                          <p className="text-xs font-normal">{item.name}</p>
                        </button>
                      )}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <ErrorNotice>{errors?.category?.message ?? null}</ErrorNotice>
          </div>
          <div className="relative">
            <div className="mb-1 indent-2">거래처</div>
            <input
              type="text"
              placeholder="입력"
              autoComplete="off"
              spellCheck="false"
              className="placeholder:text-center border border-neutral-400 outline-2 outline-neutral-400 rounded-lg w-full h-12 text-center"
              {...register("paidFor")}
            />
            <ErrorNotice>{errors?.paidFor?.message ?? null}</ErrorNotice>
          </div>
          <div className="relative pb-3">
            <div className="mb-1 indent-2">지출일자</div>
            <Controller
              name="useDate"
              control={control}
              defaultValue={selectedDate.toLocaleDateString("en-US")}
              render={() => (
                <Calendar
                  selectedDate={selectedDate}
                  handleSelectedDate={handleDate}
                />
              )}
            />
          </div>
          <div className="relative">
            <div className="mb-1 indent-2">
              <span>메모</span>
              <span className="text-xs ml-2 text-neutral-400">(선택항목)</span>
            </div>
            <input
              type="text"
              placeholder="입력"
              autoComplete="off"
              spellCheck="false"
              maxLength={21}
              className="placeholder:text-center border border-neutral-400 outline-2 outline-neutral-400 rounded-lg w-full h-12 text-center"
              {...register("memo")}
            />
            <ErrorNotice>{errors?.memo?.message ?? null}</ErrorNotice>
          </div>
          <button className="btn btn-accent text-base-100 w-full">
            지출 등록
          </button>
        </form>
      </Container>
      <button onClick={handleClose} className="absolute top-5 right-5">
        <IoCloseOutline size={26} />
      </button>
      <InformModal
        dialogRef={dialogRef}
        loading={false}
        inform="등록 되었습니다!"
      />
    </section>
  );
};

export default ExpensesForm;
