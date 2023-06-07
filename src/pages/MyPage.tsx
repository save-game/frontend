import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { BsPersonFill } from "react-icons/Bs";
import ProfileImageEdit from "../components/ProfileImageEdit";
import InformModal from "../components/InformModal";
import { useForm } from "react-hook-form";
import NicknameForm from "../components/NicknameForm";

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-500 font-bold text-sm`}
`;

const MyPage = () => {
  const [inputMode, setInputMode] = useState(false);
  const [formMode, setFormMode] = useState(false);
  //userInfo는 나중에 useQuery로
  const [userInfo, setUserInfo] = useState({
    email: "이메일",
    nickname: "닉네임",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/javatime-6eaed.appspot.com/o/user%2FJFRkuYjomQVLmW148zv8YXpL3Zi1?alt=media&token=90894058-d360-4451-82b7-cb9e643553f9",
  });

  return (
    <>
      <main className="relative">
        <Container>
          <div className="flex items-center justify-between w-full p-2 pb-4 border-b border-accent-focus/60">
            <div className="relative">
              <div className="w-20 h-20  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
                {userInfo.imageUrl ? (
                  <img
                    src={userInfo.imageUrl}
                    className="w-full"
                    alt="프로필이미지"
                  />
                ) : (
                  <BsPersonFill size={64} className="mt-2" />
                )}
              </div>
              <ProfileImageEdit img={userInfo.imageUrl} />
            </div>
            {inputMode ? (
              <NicknameForm inputEditor={setInputMode} />
            ) : (
              <>
                <div className="w-6/12 px-2 ">{userInfo.nickname}</div>
                <div>
                  <button
                    onClick={() => {
                      setInputMode(true);
                    }}
                    className="btn btn-sm btn-ghost bg-light-color hover:bg-[#dff1ed] shadow mr-2"
                  >
                    수정
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
            <div className="w-1/4">이메일</div>
            <div className="font-normal ">{userInfo.email}</div>
          </div>
          <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
            <div className="w-1/4">비밀번호</div>
            <div className="font-normal ">********</div>
          </div>
          <button className="btn btn-accent btn-md my-4 w-full text-base-100 shadow-md">
            정보 수정
          </button>

          <div className="absolute bottom-0 w-11/12 my-4 space-y-4">
            <button className="btn w-full shadow-md">로그아웃</button>
            <button className="btn btn-outline btn-erro w-full shadow-md">
              서비스 탈퇴
            </button>
          </div>
        </Container>
      </main>
    </>
  );
};
export default MyPage;
