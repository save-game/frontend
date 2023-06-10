import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import ExpenseGraphContainer from "../components/ExpenseGraphContainer";

export default function Home() {
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/70");
  const [nickName, setNickName] = useState("닉네임(기본값)");

  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileImg src={imgSrc} />
          <p className="ml-4 text-accent text-lg">{nickName}</p>
        </ProfileContainer>
        <ExpenseGraphContainer />
        <button className="btn btn-accent w-full">지출입력</button>
      </Container>
    </>
  );
}

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-500 font-bold text-sm flex flex-col justify-center items-center`}
`;

const ProfileContainer = styled.div`
  font-weight: 300;
  ${tw`h-20 w-full flex items-center mt-10 px-4 pb-2 shadow-md rounded-md`}
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  ${tw` rounded-full`};
`;
