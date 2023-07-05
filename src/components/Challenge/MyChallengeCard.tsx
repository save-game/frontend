import { useNavigate } from "react-router-dom";
import { dDayCalculator } from "../../helpers/helper";
import { deleteChallenge } from "../../api/challengeAPI";
import { useRef, useState } from "react";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import InformModal from "../Common/InformModal";
import { AiTwotoneFire } from "react-icons/Ai";
import { FcClock } from "react-icons/Fc";

export default function MyChallengeCard({
  myChallenge,
}: {
  myChallenge: { challengeId: number; title: string; endDate: string };
}) {
  const [returnMsg, setReturnMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const daysDiff = dDayCalculator(myChallenge.endDate);
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/challenge/${myChallenge.challengeId}`);
  };

  return (
    <div className="bg-base-100 border shadow w-full p-4 rounded-lg mb-2 flex flex-col justify-start">
      <div
        className=" w-full rounded-lg flex flex-col justify-between"
        onClick={handleClickCard}
      >
        <div className="flex justify-start items-center">
          <AiTwotoneFire size={16} className="text-amber-400 mr-1" />
          <p className="pt-1 text-[15px] text-cyan-900">{myChallenge.title}</p>
        </div>
        <div className="flex justify-end ">
          <FcClock size={17} className="mr-1" />
          <p className=" text-right text-[13px] text-content">
            종료까지 D-{daysDiff}
          </p>
        </div>
      </div>

      <InformModal loading={false} dialogRef={dialogRef} inform={returnMsg} />
    </div>
  );
}
