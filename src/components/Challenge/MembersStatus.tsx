import { useEffect, useState } from "react";
import {
  ChallengeMemberData,
  ChallengeMemberResultData,
  UserInfo,
} from "../../interface/interface";
import axios from "axios";
import { BsPersonFill } from "react-icons/Bs";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { BiWon } from "react-icons/Bi";
import { FaHeartBroken } from "react-icons/Fa";
import { AiTwotoneCrown } from "react-icons/Ai";

interface Props {
  readonly data: ChallengeMemberData | ChallengeMemberResultData;
  readonly top: boolean;
}

const MemberListContainer = styled.div<{ status: 1 | 0; top: boolean }>`
  ${(props) =>
    props.top
      ? css`
          ${tw`flex flex-col justify-center items-center space-y-1.5 py-1 rounded text-xs`}
        `
      : css`
          ${tw`flex justify-center items-center py-1 rounded text-xs`}
          background: ${props.status === 1 ? "inherit" : "#edecec"};
        `};
`;

const ColoredTextContainer = styled.div<{ color: string; top: boolean }>`
  ${(props) =>
    props.top
      ? css`
          ${tw` flex justify-center items-center`}
        `
      : css`
          ${tw`w-3/5 flex  items-center`}
        `};

  color: ${(props) => props.color};
`;

const MembersStatus = ({ data, top }: Props) => {
  const [memberInfo, setMemberInfo] = useState<UserInfo | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [isFirst, setIsFirst] = useState<boolean | null>(null);
  const ttlAmount = data.total_amount.toLocaleString("ko-KR");

  // memberId로 정보 서버에서 받아오기
  const getMemberData = async () => {
    try {
      const { data } = await axios.get("/src/test/memberInfo.json");
      setMemberInfo(data);
    } catch (error) {
      console.error(`MemberInfo Error : TIME(${new Date()}) ERRROR(${error})`);
    }
  };

  useEffect(() => {
    getMemberData();
    if ("isFirst" in data) {
      setIsOpen(true);
      if (data.isFirst) {
        setIsFirst(true);
      }
    } else {
      setIsOpen(false);
      setIsFirst(false);
    }
  }, [data]);

  return (
    <>
      <MemberListContainer status={isOpen ? data.status : 1} top={top}>
        <div className="relative w-7 flex justify-center items-center text-neutral-400 mr-1">
          {isFirst ? (
            <div className="relative text-amber-400">
              <AiTwotoneCrown size={24} />
              <div className="absolute top-2 left-2.5 text-[9px] font-semibold text-base-100 bg-amber-400 leading-tight ">
                1
              </div>
            </div>
          ) : null}
          {top ? (
            <div className="absolute -top-2.5 left-1 text-amber-400">
              <AiTwotoneCrown size={24} />
            </div>
          ) : null}
          {data.status === 0 && isOpen ? <FaHeartBroken size={17} /> : null}
        </div>
        <div
          className={`${
            top ? `w-16 h-16` : ` w-10 h-10`
          } rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-md shadow-slate-300`}
        >
          {memberInfo?.imageUrl ? (
            <img
              src={memberInfo.imageUrl}
              className="w-full"
              alt="프로필이미지"
            />
          ) : (
            <BsPersonFill size={top ? 64 : 40} className="mt-2 " />
          )}
        </div>

        <ColoredTextContainer color={data.color} top={top}>
          <div className={`${top ? `w-3/5` : `w-2/5 `} truncate mx-1`}>
            {data.nickName}
          </div>
          <div className="mr-1">님</div>
          {data.status === 1 || !isOpen ? (
            <div className="flex justify-center items-center">
              <BiWon />
              <div>{ttlAmount}</div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="mr-1">도전 실패!</div>
            </div>
          )}
        </ColoredTextContainer>
      </MemberListContainer>
    </>
  );
};

export default MembersStatus;
