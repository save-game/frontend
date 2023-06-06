import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { BsPersonFill } from "react-icons/Bs";
import { MdPhotoCamera } from "react-icons/Md";
import ProfileImageEdit from "../components/ProfileImageEdit";

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-500 font-bold text-sm`}
`;

const MyPage = () => {
  return (
    <>
      <main className="relative">
        <Container>
          <div className="flex items-center justify-between w-full p-2 pb-4 border-b border-accent-focus/60">
            <div className="relative">
              <div className="w-20 h-20  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
                {true ? (
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/javatime-6eaed.appspot.com/o/user%2FJFRkuYjomQVLmW148zv8YXpL3Zi1?alt=media&token=90894058-d360-4451-82b7-cb9e643553f9"
                    }
                    className="w-full"
                    alt="프로필이미지"
                  />
                ) : (
                  <BsPersonFill size={64} className="mt-2" />
                )}
              </div>
              <div className="absolute flex items-center justify-center bg-base-100 rounded-full w-8 h-8 shadow bottom-0 right-0 -m-1.5">
                <MdPhotoCamera size={20} />
              </div>
            </div>

            <div className="w-6/12 px-2">닉네임</div>
            <div>
              <button className="btn btn-sm btn-ghost bg-light-color hover:bg-[#dff1ed] shadow mr-2">
                수정
              </button>
            </div>
          </div>
          <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
            <div className="w-1/4">이메일</div>
            <div className="font-normal ">내 이메일 주소</div>
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
        <ProfileImageEdit />
      </main>
    </>
  );
};
export default MyPage;
