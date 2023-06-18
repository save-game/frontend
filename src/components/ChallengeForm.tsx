import React, { useRef, useState, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import tw from "twin.macro";

import { RangeCalendarStart, RangeCalendarEnd } from "./Calendar";
import InformModal from "./Common/InformModal";
import { addOneMonth } from "../helpers/helper";
import { SHOW_WARNING_MODAL_DELAY } from "../constants/modalTime";

export default function ChallengeForm() {
  const [memberCount, setMemberCount] = useState<number>(2);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addOneMonth(new Date()));

  const memberCountWarningRef = useRef<HTMLDialogElement>(null);
  const goalAmountWarningRef = useRef<HTMLDialogElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const goalAmountInputRef = useRef<HTMLInputElement>(null);

  const challengeSchema = Yup.object({
    title: Yup.string().required("필수 입력 항목입니다."),
    goal_amount: Yup.number().required("필수 입력 항목입니다."),
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setValue("image", {
        file: fileList[0],
        thumnail: url,
        name: fileList[0].name,
      });
    }
  };

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
    try {
      console.log(data);
    } catch (error) {
      console.log(`[handleSubmitChallenge] ${new Date()}: ${error}`);
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
    titleInputRef.current.value = "";
    contentInputRef.current.value = "";
    goalAmountInputRef.current.value = "";
  };

  useEffect(() => {
    setValue("member_count", memberCount);
  }, [memberCount, setValue]);

  return (
    <>
      <input type="checkbox" id="challenge_form" className="modal-toggle" />
      <div className="modal bg-white">
        <div className=" max-h-full w-full rounded-none">
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
              className="w-full h-full flex flex-col items-center"
              onSubmit={handleSubmit(handleSubmitChallenge)}
              onSubmitCapture={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-control w-full justify-evenly items-center h-96">
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
                        className="text-lg input h-10 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
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
                <div className="w-full">
                  <label
                    htmlFor="image_input"
                    className="btn btn-outline text-lg btn-ghost w-full shadow-md btn-sm"
                  >
                    배경 이미지 넣기+
                  </label>
                  <input
                    id="image_input"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </div>
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
                        className="text-lg input h-10 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
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
                      defaultValue={startDate.toLocaleDateString("ko-KR")}
                      render={({ field }) => (
                        <RangeCalendarStart
                          startDate={startDate}
                          endDate={endDate}
                          handleSelectedDate={(date) => {
                            field.onChange(date.toLocaleDateString("ko-KR"));
                            setStartDate(date);
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="end_date"
                      control={control}
                      defaultValue={endDate.toLocaleDateString("ko-KR")}
                      render={({ field }) => (
                        <RangeCalendarEnd
                          startDate={startDate}
                          endDate={endDate}
                          handleSelectedDate={(date) => {
                            field.onChange(date.toLocaleDateString("ko-KR"));
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
                        className="text-lg input h-10 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400 pr-10"
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        onBlur={handleOnblurCount}
                        onFocus={handleOnFocusCount}
                        ref={goalAmountInputRef}
                      />
                      <span className="absolute text-lg right-8">원</span>
                    </div>
                  )}
                />
                {errors.goal_amount && (
                  <span className="message text-xs text-error text-center">
                    {`${errors.goal_amount.message}`}
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
                      id="title"
                      type="member_count"
                      value={memberCount}
                      disabled
                      className="text-lg h-10 w-20 text-center border border-l-[0.4px] border-neutral-400"
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
              <button className="btn btn-accent w-full my-4 mt-auto">
                챌린지 등록
              </button>
            </form>
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
