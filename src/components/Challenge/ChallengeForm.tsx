import React, { useRef, useState, useEffect } from "react";
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

export default function ChallengeForm() {
  const [memberCount, setMemberCount] = useState<number>(2);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addOneMonth(new Date()));
  const [openForm, setOpenForm] = useRecoilState(openFormState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const memberCountWarningRef = useRef<HTMLDialogElement>(null);
  const goalAmountWarningRef = useRef<HTMLDialogElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const goalAmountInputRef = useRef<HTMLInputElement>(null);

  const challengeSchema = Yup.object({
    title: Yup.string().required("필수 입력 항목입니다."),
    goal_amount: Yup.number()
      .max(10000000, "10000000원 이하로 입력해주세요")
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

  const handleSubmitChallenge = async (data: FieldValues) => {
    console.log(data, memberCount);
    try {
      await postChallenge(data, memberCount);
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
        navigate("/challenge");
      }, SHOW_MODAL_DELAY);
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
  };
  const handleSelectCategory = (item: Category) => {
    setValue("category", item.category);
  };

  // useEffect(() => {
  //   setValue("member_count", memberCount);
  // }, [memberCount, setValue]);

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
              X
            </label>
            <h3 className="font-bold text-2xl mt-4 mb-4">챌린지 등록하기</h3>
            <form
              className="w-full h-full flex flex-col justify-around items-center"
              onSubmit={handleSubmit(handleSubmitChallenge)}
              onSubmitCapture={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-control w-full h-3/4 justify-between items-center">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <div className=" flex w-full justify-between items-center">
                      <label htmlFor="title" className="label-text text-lg">
                        제목
                      </label>
                      <input
                        id="title"
                        type="text"
                        defaultValue={field.value}
                        placeholder="제목을 입력해주세요."
                        className="text-sm input h-8 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                        onChange={(e) => field.onChange(e.target.value)}
                        ref={titleInputRef}
                      />
                    </div>
                  )}
                />
                {errors.title && (
                  <span className="message text-xs text-error text-center">
                    {`${errors.title.message}`}
                  </span>
                )}
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <div className=" flex w-full justify-between items-center">
                      <label htmlFor="content" className="label-text text-lg">
                        부제
                      </label>
                      <input
                        id="content"
                        type="text"
                        defaultValue={field.value}
                        placeholder="부제를 입력해주세요."
                        className="text-sm input h-8 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                        onChange={(e) => field.onChange(e.target.value)}
                        ref={contentInputRef}
                      />
                    </div>
                  )}
                />
                <div className="relative flex w-full justify-between items-center">
                  <label htmlFor="title" className="label-text text-lg w-14">
                    기간
                  </label>
                  <div className="w-9/12 flex">
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
                      <label
                        htmlFor="goal_amount"
                        className="label-text text-lg"
                      >
                        금액
                      </label>
                      <input
                        id="goal_amount"
                        type="text"
                        defaultValue={field.value}
                        placeholder="목표 금액을 입력해주세요."
                        className="text-sm input h-8 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400 pr-10"
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        onBlur={handleOnblurCount}
                        onFocus={handleOnFocusCount}
                        ref={goalAmountInputRef}
                      />
                      <span className="absolute text-lg right-12">원</span>
                    </div>
                  )}
                />
                {errors.goal_amount && (
                  <span className="message text-xs text-error text-center">
                    {`${errors.goal_amount.message}`}
                  </span>
                )}
                <ChallengeCategoryFilter
                  handleSelectCategory={handleSelectCategory}
                />
                {errors.category && (
                  <span className="message text-xs text-error text-center">
                    {`${errors.category.message}`}
                  </span>
                )}
                <div className=" flex w-full justify-between items-center">
                  <label htmlFor="member_count" className="label-text text-lg">
                    모집인원
                  </label>
                  <div className="w-9/12 flex items-center justify-center">
                    <button
                      className="btn btn-ghost h-10"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMemberCount("down");
                      }}
                    >
                      {"<"}
                    </button>
                    <input
                      id="member_count"
                      type="text"
                      value={memberCount}
                      disabled
                      className="text-md h-8 w-20 text-center border border-l-[0.4px] border-neutral-400"
                    />
                    <span className="text-lg ml-2">명</span>
                    <button
                      className="btn btn-ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMemberCount("up");
                      }}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </div>
              <button className="btn btn-accent w-full mb-4">
                챌린지 등록
              </button>
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
