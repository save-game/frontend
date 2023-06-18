import { useEffect, useState } from "react";
import { ChallengeMemberData, UserInfo } from "../../interface/interface";
import axios from "axios";
import { BsPersonFill } from "react-icons/Bs";
import styled from "styled-components";
import tw from "twin.macro";
import { BiWon } from "react-icons/Bi";

interface Props {
  readonly data: ChallengeMemberData;
}

const ColoredTextContainer = styled.div<{ color: string }>`
  ${tw`w-3/5 flex  items-center`};
  color: ${(props) => props.color};
`;

console.log("ColoredTextContainer", ColoredTextContainer);

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
      <div className="flex justify-center items-center mb-1">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
          {memberInfo?.imageUrl ? (
            <img
              src={memberInfo.imageUrl}
              className="w-full"
              alt="프로필이미지"
            />
          ) : (
            <BsPersonFill size={48} className="mt-2" />
          )}
        </div>
        <ColoredTextContainer color={data.color}>
          <div className="w-2/5 truncate mx-1">{data.nickName}</div>
          <div className="mr-1">님</div>
          <BiWon />
          <div>{data.ttlAmount}</div>
        </ColoredTextContainer>
      </div>
    </>
  );
};

export default MembersStatus;
