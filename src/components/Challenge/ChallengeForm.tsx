import React, { useRef, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import tw from "twin.macro";
import { RangeCalendarStart, RangeCalendarEnd } from "../Common/Calendar";
import InformModal from "../Common/InformModal";
import { addOneMonth } from "../../helpers/helper";
import {
  SHOW_MODAL_DELAY,
  SHOW_WARNING_MODAL_DELAY,
} from "../../constants/modalTime";
import ChallengeCategoryFilter from "./ChallengeCategoryFilter";
import { Category } from "../../constants/expenseCategory";
import { postChallenge } from "../../api/challengeAPI";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { openFormState } from "../../Recoil/challengeFormAtom";
import { useMutation, useQueryClient } from "react-query";
import { IoCloseOutline } from "react-icons/Io5";
import { AiOutlineMinus } from "react-icons/Ai";
import { BiMinus } from "react-icons/Bi";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ChallengeForm() {
  const [memberCount, setMemberCount] = useState<number>(2);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addOneMonth(new Date()));
  const [openForm, setOpenForm] = useRecoilState(openFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const memberCountWarningRef = useRef<HTMLDialogElement>(null);
  const goalAmountWarningRef = useRef<HTMLDialogElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const goalAmountInputRef = useRef<HTMLInputElement>(null);

  const challengeSchema = Yup.object({
    title: Yup.string().required("필수 입력 항목입니다."),
    content: Yup.string().required("필수 입력 항목입니다."),
    goal_amount: Yup.number()
      .max(10000000, "10,000,000원 이하로 입력해주세요")
      .required("필수 입력 항목입니다."),
    category: Yup.string().required(
      "필수 입력 항목입니다. 카테고리를 선택해주세요."
    ),
  });

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(challengeSchema),
    mode: "onSubmit",
  });

  const handleOnblurCount = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      return;
    }
    if (isNaN(Number(e.target.value))) {
      e.target.value = "";
      setValue("goal_amount", 0);
      if (!goalAmountWarningRef.current) {
        return;
      }
      goalAmountWarningRef.current.showModal();
      setTimeout(() => {
        if (goalAmountWarningRef.current) {
          goalAmountWarningRef.current.close();
        }
      }, SHOW_WARNING_MODAL_DELAY);
      return;
    }
    const formattedValue = Number(e.target.value).toLocaleString("ko-KR");
    e.target.value = formattedValue;
  };

  const handleOnFocusCount = (e: React.FocusEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = formattedValue;
  };

  const handleMemberCount: (updown: string) => void = (updown) => {
    switch (updown) {
      case "up":
        if (memberCount >= 10) {
          if (!memberCountWarningRef.current) {
            return;
          }
          memberCountWarningRef.current.showModal();
          setTimeout(() => {
            if (memberCountWarningRef.current) {
              memberCountWarningRef.current.close();
            }
          }, SHOW_WARNING_MODAL_DELAY);
          return;
        }
        setMemberCount(memberCount + 1);
        break;
      case "down":
        if (memberCount <= 2) {
          return;
        }
        setMemberCount(memberCount - 1);
        break;
    }
  };

  const { mutate: updateChallenge } = useMutation(postChallenge, {
    onSuccess: (repsonseData) => {
      const challengeId = repsonseData.data.id;
      setOpenForm(false);
      handleResetForm();
      if (dialogRef.current) {
        dialogRef.current.showModal();
        setTimeout(() => setIsLoading(false), 300);
        setIsLoading(true);
      } else {
        return;
      }
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
        navigate(`/challenge/${challengeId}`);
      }, SHOW_MODAL_DELAY);
      queryClient.invalidateQueries(["getChallengeData"]);
    },
  });

  const handleSubmitChallenge = async (data: FieldValues) => {
    try {
      updateChallenge({ data, memberCount });
    } catch (error) {
      console.error(
        `handleSubmitChallenge Error: Time(${new Date()}) ERROR ${error}`
      );
    }
  };

  const handleResetForm = () => {
    if (
      !titleInputRef.current ||
      !contentInputRef.current ||
      !goalAmountInputRef.current
    ) {
      return;
    }
    reset();
    setOpenForm(false);
    titleInputRef.current.value = "";
    contentInputRef.current.value = "";
    goalAmountInputRef.current.value = "";
    setStartDate(new Date());
    setEndDate(addOneMonth(new Date()));
    setMemberCount(2);
    setSelectedCategory("");
  };
  const handleSelectCategory = (item: Category) => {
    setSelectedCategory(item.category);
    setValue("category", item.category);
  };

  return (
    <>
      <input
        type="checkbox"
        id="challenge_form"
        checked={openForm}
        className="modal-toggle"
        readOnly
      />
      <div className="modal bg-white">
        <div className="modal-box max-h-full w-full rounded-none">
          <Container>
            <label
              htmlFor="challenge_form"
              className="btn btn-ghost absolute top-4 right-2"
              onClick={handleResetForm}
            >
              <IoCloseOutline size={26} />
            </label>
            <h3 className="font-bold text-[16px] text-cyan-950 mt-1 mb-4">
              챌린지 등록
            </h3>
            <form
              className="w-full h-full flex flex-col items-center"
              onSubmit={handleSubmit(handleSubmitChallenge)}
              onSubmitCapture={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-control w-full items-center">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <div className=" flex w-full justify-between items-center">
                      <label htmlFor="title" className="text-cyan-950">
                        제목
                      </label>
                      <input
                        id="title"
                        type="text"
                        defaultValue={field.value}
                        placeholder="제목을 입력해주세요."
                        className="text-sm placeholder:text-xs placeholder:font-light input h-8 w-10/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                        onChange={(e) => field.onChange(e.target.value)}
                        ref={titleInputRef}
                      />
                    </div>
                  )}
                />
                <span className="w-full h-4  p-0 font-light text-[11px] text-error text-right">
                  {errors.title && `${errors.title.message}`}
                </span>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <div className=" flex w-full justify-between items-center">
                      <label htmlFor="content" className="text-cyan-950">
                        부제
                      </label>
                      <input
                        id="content"
                        type="text"
                        defaultValue={field.value}
                        placeholder="부제를 입력해주세요."
                        className="text-sm placeholder:text-xs placeholder:font-light input h-8 w-10/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                        onChange={(e) => field.onChange(e.target.value)}
                        ref={contentInputRef}
                      />
                    </div>
                  )}
                />
                <span className="w-full h-4 my-0 p-0 font-light text-[11px] text-error text-right">
                  {errors.content && `${errors.content.message}`}
                </span>

                <div className="relative  flex w-full mb-4 justify-between items-center">
                  <label htmlFor="title" className="text-cyan-950">
                    기간
                  </label>
                  <div className="w-10/12 flex text-xs">
                    <Controller
                      name="start_date"
                      control={control}
                      defaultValue={startDate.toLocaleDateString("en-US")}
                      render={({ field }) => (
                        <RangeCalendarStart
                          startDate={startDate}
                          endDate={endDate}
                          handleSelectedDate={(date) => {
                            field.onChange(date.toLocaleDateString("en-US"));
                            setStartDate(date);
                          }}
                        />
                      )}
                    />
                    <span className="mx-1 pt-2">-</span>
                    <Controller
                      name="end_date"
                      control={control}
                      defaultValue={endDate.toLocaleDateString("en-US")}
                      render={({ field }) => (
                        <RangeCalendarEnd
                          startDate={startDate}
                          endDate={endDate}
                          handleSelectedDate={(date) => {
                            field.onChange(date.toLocaleDateString("en-US"));
                            setEndDate(date);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <Controller
                  name="goal_amount"
                  control={control}
                  render={({ field }) => (
                    <div className=" flex w-full justify-between items-center">
                      <label htmlFor="goal_amount" className="text-cyan-950">
                        금액
                      </label>
                      <input
                        id="goal_amount"
                        type="text"
                        defaultValue={field.value}
                        placeholder="목표 금액을 입력해주세요."
                        className="text-sm placeholder:text-xs placeholder:font-light input h-8 w-10/12 max-w-xs border border-l-[0.4px] border-neutral-400 pr-10"
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        onBlur={handleOnblurCount}
                        onFocus={handleOnFocusCount}
                        ref={goalAmountInputRef}
                      />
                      <span className="absolute  right-12">원</span>
                    </div>
                  )}
                />
                <span className="w-full h-4 my-0 p-0 font-light text-[11px] text-error text-right">
                  {errors.goal_amount && `${errors.goal_amount.message}`}
                </span>
                <div className="w-11/12 mt-3 mb-1">
                  <ChallengeCategoryFilter
                    selected={selectedCategory}
                    handleGetCategory={handleSelectCategory}
                  />
                </div>
                <span className="w-full h-4 mb-3 p-0 font-light text-[11px] text-error text-right">
                  {errors.category && `${errors.category.message}`}
                </span>
                <div className=" flex w-ful justify-between items-center">
                  <label htmlFor="member_count" className="text-cyan-950">
                    모집인원
                  </label>
                  <div className="w-7/12 flex items-center justify-center">
                    <button
                      className="btn btn-ghost btn-sm px-1 hover:text-accent-focus hover:bg-transparent h-10"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMemberCount("down");
                      }}
                    >
                      <FiMinus />
                    </button>
                    <input
                      id="member_count"
                      type="text"
                      value={memberCount}
                      disabled
                      className="text-md h-8 w-2/5 text-xs text-center rounded-lg border border-l-[0.4px] border-neutral-400"
                    />
                    <button
                      className="btn btn-ghost btn-sm px-1 hover:text-accent-focus hover:bg-transparent"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMemberCount("up");
                      }}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <span className="text-cyan-950 pr-2">명</span>
                </div>
                <button className="btn btn-neutral text-base-100 btn-sm h-10 w-full mt-7">
                  챌린지 등록
                </button>
              </div>
            </form>
            <InformModal
              dialogRef={dialogRef}
              loading={isLoading}
              inform="챌린지 등록이 완료 되었습니다."
            />
            <InformModal
              dialogRef={memberCountWarningRef}
              loading={false}
              inform="최대 모집 인원 수는 10명입니다."
            />
            <InformModal
              dialogRef={goalAmountWarningRef}
              loading={false}
              inform="숫자만 입력 가능합니다."
            />
          </Container>
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  ${tw`mx-auto h-screen w-11/12 pt-8 text-neutral-500 font-bold text-sm flex flex-col justify-center items-center`}
`;
