import { useEffect, useState } from "react";
import { ChallengeMemberData, UserInfo } from "../../interface/interface";
import axios from "axios";
import { BsPersonFill } from "react-icons/Bs";
import styled from "styled-components";
import tw from "twin.macro";
import { BiWon } from "react-icons/Bi";
import { FaHeartBroken } from "react-icons/Fa";
import { AiTwotoneCrown } from "react-icons/Ai";
import { RiVipCrownFill } from "react-icons/Ri";

interface Props {
  readonly data: ChallengeMemberData;
}

const MemberListContainer = styled.div<{ status: 1 | 0 }>`
  ${tw`flex justify-center items-center py-1 rounded`};
  background: ${(props) => (props.status === 1 ? "inherit" : "#edecec")};
`;

const ColoredTextContainer = styled.div<{ color: string }>`
  ${tw`w-3/5 flex  items-center`};
  color: ${(props) => props.color};
`;

const MembersStatus = ({ data }: Props) => {
  const [memberInfo, setMemberInfo] = useState<UserInfo | null>(null);
  // memberId로 정보 서버에서 받아오기
  const getMemberData = async () => {
    try {
      const { data } = await axios.get("/src/test/memberInfo.json");
      setMemberInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMemberData();
  }, [data]);

  return (
    <>
      <MemberListContainer status={data.status}>
        <div className="w-7 text-amber-400">
          {data.isFirst ? (
            <div className="relative">
              <AiTwotoneCrown size={24} />
              <div className="absolute top-2 left-2.5 text-[9px] font-semibold text-base-100 bg-amber-400 leading-tight ">
                1
              </div>
            </div>
          ) : null}
        </div>
        <div className=" w-10 h-10 rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
          {memberInfo?.imageUrl ? (
            <img
              src={memberInfo.imageUrl}
              className="w-full"
              alt="프로필이미지"
            />
          ) : (
            <BsPersonFill size={40} className="mt-2" />
          )}
        </div>

        <ColoredTextContainer color={data.color}>
          <div className="w-2/5 truncate mx-1">{data.nickName}</div>
          <div className="mr-1">님</div>
          {data.status === 1 ? (
            <div className="flex justify-center items-center">
              <BiWon />
              <div>{data.ttlAmount}</div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="mr-1">도전 실패..!</div>
              <FaHeartBroken size={15} />
            </div>
          )}
        </ColoredTextContainer>
      </MemberListContainer>
    </>
  );
};

export default MembersStatus;
