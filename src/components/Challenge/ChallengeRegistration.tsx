import { useEffect, useRef, useState } from "react";
import { ChallengeData, UserData } from "../../interface/interface";
import { BsPersonDashFill, BsPersonPlusFill } from "react-icons/Bs";
import { MdPeople } from "react-icons/Md";
import { deleteChallenge, postJoinChallenge } from "../../api/challengeAPI";
import { useParams } from "react-router-dom";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import InformModal from "../Common/InformModal";
import { UseQueryResult } from "react-query";
import { useUser } from "../../api/membersAPI";

interface ChallengeDataProps {
  challengeData: ChallengeData;
}

const ChallengeRegistration = ({ challengeData }: ChallengeDataProps) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [participated, setParticipated] = useState(false);
  const [returnMsg, setReturnMsg] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const challengeId = Number(useParams().challengeId);
  const { data: userInfo }: UseQueryResult<UserData> = useUser();

  useEffect(() => {
    const isParticipated = challengeData.challengeMemberList.find(
      (member) => member.memberId === userInfo?.memberId
    )
      ? true
      : false;
    setParticipated(isParticipated);
  }, [challengeData]);

  const returnDialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (challengeData.challengeMemberList.length >= 10) {
      setIsAvailable(false);
    } else {
      setIsAvailable(true);
      setMemberCount(challengeData.challengeMemberList.length);
    }
  }, [challengeData]);

  const handleChallengeRegister = async () => {
    if (isAvailable) {
      setMemberCount((count) => count + 1);
      setIsAvailable(false);
      setParticipated(true);
    }
    const res = await postJoinChallenge(challengeId);
    if (res.success === true) {
      setReturnMsg("참가하기가 완료되었습니다.");
    } else {
      setReturnMsg(res.data);
    }
    if (!returnDialogRef.current) return;
    returnDialogRef.current.showModal();
    setTimeout(() => {
      if (!returnDialogRef.current) return;
      returnDialogRef.current.close();
    }, SHOW_MODAL_DELAY);
    return false;
  };

  const handleExitButton = async () => {
    const res = await deleteChallenge(challengeId);
    if (res.success === true) {
      setReturnMsg("나가기가 완료되었습니다.");
      location.reload();
    } else {
      setReturnMsg(res.data);
    }
    if (!returnDialogRef.current) return;
    returnDialogRef.current.showModal();
    setTimeout(() => {
      if (!returnDialogRef.current) return;
      returnDialogRef.current.close();
    }, SHOW_MODAL_DELAY);
  };

  return (
    <div className="bg-base-100 rounded-lg my-3 p-10 pb-20 shadow">
      <div className="mb-2 text-cyan-950 text-base">현재 모집인원</div>
      <div className="mb-2 text-base flex justify-center items-center">
        <MdPeople size={20} className="mr-1.5 pt-0.5 text-neutral-500" />
        <p className="text-accent-focus mt-1 mr-1">{memberCount}</p>
        <p className="mt-1"> /10 명</p>
      </div>
      {isAvailable && !participated ? (
        <button
          onClick={handleChallengeRegister}
          className="btn w-full btn-neutral text-base-100 flex items-center mt-4"
        >
          <BsPersonPlusFill size={16} className="mr-2" />
          <span className="mt-0.5">참가하기</span>
        </button>
      ) : null}
      {participated ? (
        <button
          type="button"
          onClick={handleExitButton}
          className="btn w-full btn-neutral text-base-100 flex items-center mt-4 "
        >
          <BsPersonDashFill size={16} className="mr-2" />
          <span className="mt-0.5">챌린지 나가기</span>
        </button>
      ) : null}
      <InformModal
        loading={false}
        dialogRef={returnDialogRef}
        inform={returnMsg}
      />
    </div>
  );
};

export default ChallengeRegistration;
