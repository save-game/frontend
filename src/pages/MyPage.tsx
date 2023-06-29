import { useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { BsPersonFill } from "react-icons/Bs";
import ProfileImageEdit from "../components/MyPage/ProfileImageEdit";
import NicknameForm from "../components/MyPage/NicknameForm";
import PasswordForm from "../components/MyPage/PasswordForm";
import { useNavigate } from "react-router-dom";
import InformModal from "../components/Common/InformModal";
import ConfirmModal from "../components/Common/ConfirmModal";
import { SHOW_MODAL_DELAY } from "../constants/modalTime";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { refreshToken, token } from "../Recoil/token";
import { user } from "../Recoil/user";
import { UserData } from "../interface/interface";
import { signOut, withdrawal } from "../api/authAPI";
import { useUser } from "../api/membersAPI";
import { UseQueryResult } from "react-query";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "../Recoil/loading";

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-600 font-bold text-sm`}
`;

const MyPage = () => {
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const informWithdrawalRef = useRef<HTMLDialogElement>(null);
  const informChangeRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const [nicknameForm, setNicknameForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState(false);
  const { data: userInfo }: UseQueryResult<UserData> = useUser();

  const handleSignOut = async () => {
    const res = await signOut();

    //아래 부분은 protected rount쪽에서 구현할까봐
    if (res.success) {
      localStorage.clear();
      navigate("/");
    }
  };

  const confirmWithdrawal = () => {
    if (confirmDialogRef.current) {
      confirmDialogRef.current.showModal();
    }
  };

  const handleWithdrawal = async () => {
    const res = await withdrawal();
    if (res.data.success) {
      if (!informWithdrawalRef.current) return;

      informWithdrawalRef.current.showModal();
      setTimeout(() => {
        if (!informWithdrawalRef.current) return;
        informWithdrawalRef.current.close();
        navigate("/");
      }, SHOW_MODAL_DELAY);
    }
  };

  return (
    <>
      <main className="relative">
        <Container>
          <div className="flex items-center justify-between w-full p-2 pb-4 border-b border-accent-focus/60">
            <div className="relative">
              <div className="w-20 h-20  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg">
                {userInfo?.profileImageUrl ? (
                  <img
                    src={userInfo.profileImageUrl}
                    className="w-full"
                    alt="프로필이미지"
                  />
                ) : (
                  <BsPersonFill size={80} className="mt-2" />
                )}
              </div>
              <ProfileImageEdit
                img={userInfo?.profileImageUrl}
                informChangeRef={informChangeRef}
              />
            </div>
            {nicknameForm ? (
              <NicknameForm
                formEditor={setNicknameForm}
                informChangeRef={informChangeRef}
              />
            ) : (
              <>
                <div className="w-6/12 px-2 ">{userInfo?.nickname}</div>
                <div>
                  <button
                    onClick={() => {
                      setNicknameForm(true);
                    }}
                    className="btn btn-sm btn-ghost bg-light-color hover:bg-[#dff1ed] shadow mr-2"
                  >
                    수정
                  </button>
                </div>
              </>
            )}
          </div>
          {passwordForm ? (
            <PasswordForm
              formEditor={setPasswordForm}
              informChangeRef={informChangeRef}
            />
          ) : (
            <div>
              <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
                <div className="w-1/4">이메일</div>
                <div className="font-normal ">{userInfo?.email}</div>
              </div>
              <div className="flex items-center w-full h-16 p-2 border-b border-accent-focus/60">
                <div className="w-1/4">비밀번호</div>
                <div className="font-normal ">********</div>
              </div>
              <button
                onClick={() => setPasswordForm(true)}
                className="btn btn-accent btn-md my-4 w-full text-base-100 shadow-md"
              >
                비밀번호 변경
              </button>
              <div className="absolute bottom-0 w-11/12 my-4 space-y-4">
                <button
                  onClick={handleSignOut}
                  className="btn btn-neutral w-full shadow-md"
                >
                  로그아웃
                </button>
                <button
                  onClick={confirmWithdrawal}
                  className="btn btn-outline btn-erro w-full shadow-md"
                >
                  서비스 탈퇴
                </button>
              </div>
            </div>
          )}
        </Container>
        <ConfirmModal
          dialogRef={confirmDialogRef}
          confirm=" 정말로 서비스를 탈퇴하시겠습니까?"
          onConfirm={handleWithdrawal}
        />
        <InformModal
          dialogRef={informWithdrawalRef}
          loading={false}
          inform="탈퇴처리가 완료되었습니다."
        />
        <InformModal
          dialogRef={informChangeRef}
          loading={isLoading}
          inform="변경되었습니다!"
        />
      </main>
    </>
  );
};
export default MyPage;
