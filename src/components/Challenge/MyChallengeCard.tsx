import { useNavigate } from "react-router-dom";
import { dDayCalculator } from "../../helpers/helper";
import { deleteChallenge } from "../../api/challengeAPI";
import { useRef, useState } from "react";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import InformModal from "../Common/InformModal";

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

  const handleExitButton = async () => {
    const res = await deleteChallenge(myChallenge.challengeId);
    if (res.success === true) {
      setReturnMsg("나가기가 완료되었습니다.");
      location.reload();
    } else {
      setReturnMsg(res.data);
    }
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
    setTimeout(() => {
      if (!dialogRef.current) return;
      dialogRef.current.close();
    }, SHOW_MODAL_DELAY);
  };

  return (
    <div className="shadow-md w-full p-4 rounded-lg h-28 mb-4 flex flex-col justify-between">
      <div
        className=" w-full rounded-lg h-24  flex flex-col justify-between"
        onClick={handleClickCard}
      >
        <p>{myChallenge.title}</p>
        <div className="flex justify-end mb-4"></div>
        <p className=" text-right text-accent text-100">
          D-{daysDiff} 도전은 순항 중!
        </p>
      </div>
      <button
        type="button"
        onClick={handleExitButton}
        className="btn btn-accent btn-outline btn-sm text-white w-28 text-xs "
      >
        챌린지 나가기
      </button>
      <InformModal loading={false} dialogRef={dialogRef} inform={returnMsg} />
    </div>
  );
}
