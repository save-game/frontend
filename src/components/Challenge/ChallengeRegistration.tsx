import { useEffect, useState } from "react";
import { ChallengeData } from "../../interface/interface";
import { BsPersonPlusFill } from "react-icons/Bs";
import { MdPeople } from "react-icons/Md";
import { postJoinChallenge } from "../../api/challengeAPI";

interface ChallengeDataProps {
  challengeData: ChallengeData;
}

const ChallengeRegistration = ({ challengeData }: ChallengeDataProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (challengeData.challengeMemberList.length >= 10) {
      setIsAvailable(false);
    } else {
      setIsAvailable(true);
    }
  }, [challengeData]);

  //지우기
  const challengeId = 8;

  const handleChallengeRegister = () => {
    //서버에 참가 요청
    postJoinChallenge(challengeId);
    console.log("참가신청!");
  };

  return (
    <div className="bg-base-100 rounded-lg my-3 p-10 pb-20 shadow">
      <div className="mb-2 text-cyan-950 text-base">현재 모집인원</div>
      <div className="mb-2 text-base flex justify-center items-center">
        <MdPeople size={20} className="mr-1.5 pt-0.5 text-neutral-500" />
        <p className="text-accent-focus mt-1 mr-1">
          {challengeData.challengeMemberList.length}
        </p>
        <p className="mt-1"> /10 명</p>
      </div>
      {isAvailable ? (
        <button
          onClick={handleChallengeRegister}
          className="btn w-full btn-accent text-base-100 flex items-center mt-4"
        >
          <BsPersonPlusFill size={15} className="mr-2" />
          <span className="mt-0.5">참가하기</span>
        </button>
      ) : null}
    </div>
  );
};

export default ChallengeRegistration;
