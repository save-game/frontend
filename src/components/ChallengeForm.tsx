import React, { useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import tw from "twin.macro";

import Calendar from "./Calendar";
import InformModal from "./Common/InformModal";

interface Imagefile {
  file: File | null;
  thumnail: string;
  name: string;
}

export default function ChallengeForm() {
  const [challengeTitle, setChallengeTitle] = useState<string>("");
  const [memberCount, setMemberCount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const dialogRef = useRef<HTMLDialogElement>(null);

  const challengeSchema = Yup.object({});

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
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
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeTitle(e.target.value);
    setValue("title", challengeTitle);
  };

  const handleStartDate = (date: Date) => {
    setStartDate(date);
    const stringDate = startDate.toLocaleDateString("ko-KR");
    setValue("start_date", stringDate);
  };
  const handleEndDate = (date: Date) => {
    setEndDate(date);
    const stringDate = endDate.toLocaleDateString("ko-KR");
    setValue("end_date", stringDate);
  };

  const handleMemberCount: (updown: string) => void = (updown) => {
    switch (updown) {
      case "up":
        if (memberCount >= 10) {
          if (dialogRef.current) {
            dialogRef.current.showModal();
          }
          setTimeout(() => {
            if (dialogRef.current) {
              dialogRef.current.close();
            }
          }, 2000);
          return;
        }
        setMemberCount(memberCount + 1);
        break;
      case "down":
        if (memberCount <= 0) {
          return;
        }
        setMemberCount(memberCount - 1);
        break;
    }
    setValue("member_count", memberCount);
  };

  const handleSubmitChallenge = () => {
    try {
      console.log(watch("title"));
      console.log(watch("image"));
      console.log(watch("start_date"));
      console.log(watch("end_date"));
      console.log(watch("member_count"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input type="checkbox" id="challenge_form" className="modal-toggle" />
      <div className="modal bg-white">
        <div className=" max-h-full w-full rounded-none">
          <Container>
            <label
              htmlFor="challenge_form"
              className="btn btn-ghost absolute top-4 right-2"
            >
              X
            </label>
            <h3 className="font-bold text-2xl mt-4 mb-4">챌린지 등록하기</h3>
            <form
              className="w-full h-full flex flex-col items-center"
              onSubmit={handleSubmitChallenge}
              onSubmitCapture={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-control w-full justify-around items-center h-96">
                <div className=" flex w-full justify-between items-center">
                  <label htmlFor="title" className="label-text text-lg">
                    제목
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="제목을 입력해주세요."
                    className="text-lg input h-10 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                    onChange={handleTitle}
                  />
                </div>
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
                <div className="flex w-full justify-between items-center">
                  <label htmlFor="title" className="label-text text-lg">
                    부제
                  </label>
                  <input
                    id="subtitle"
                    type="text"
                    placeholder="제목을 입력해주세요."
                    className="text-lg input h-10 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                  />
                </div>
                <div className="relative flex w-full justify-between items-center">
                  <label htmlFor="title" className="label-text text-lg w-14">
                    기간
                  </label>
                  <div className="w-9/12 flex">
                    <Calendar
                      selectedDate={startDate}
                      handleSelectedDate={handleStartDate}
                    />
                    <Calendar
                      selectedDate={endDate}
                      handleSelectedDate={handleEndDate}
                    />
                  </div>
                </div>
                <div className=" flex w-full justify-between items-center">
                  <label htmlFor="title" className="label-text text-lg">
                    금액
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="목표 금액을 입력해주세요."
                    className="text-lg input h-10 w-9/12 max-w-xs border border-l-[0.4px] border-neutral-400"
                  />
                </div>
                <div className=" flex w-full justify-between items-center">
                  <label htmlFor="title" className="label-text text-lg">
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
                      type="text"
                      defaultValue={0}
                      value={memberCount}
                      placeholder=""
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
              <button
                // htmlFor="challenge_form"
                className="btn btn-accent w-full my-4"
              >
                챌린지 등록
              </button>
            </form>
            <InformModal
              dialogRef={dialogRef}
              loading={false}
              inform="최대 모집 인원 수는 10명입니다."
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
