import { useNavigate } from "react-router";
import { dDayCalculator } from "../../helpers/helper";
import { ChallengeDataProps } from "../../interface/interface";
import { GoGoal } from "react-icons/Go";
import { MdPeople } from "react-icons/Md";
import { BsPersonFill } from "react-icons/Bs";
import { CgSandClock } from "react-icons/Cg";
import { FcAdvertising } from "react-icons/Fc";

export default function ChallengeCard({
  challengeData,
}: {
  challengeData: ChallengeDataProps;
}) {
  const navigate = useNavigate();
  const stardDDay = dDayCalculator(challengeData.startDate);
  const handleClickCard = () => {
    navigate(`/challenge/${challengeData.challengeId}`);
  };
  return (
    <div
      onClick={handleClickCard}
      className="rounded-2xl border pt-2 px-4 bg-base-100 hover:bg-zinc-100 grid grid-cols-2 grid-rows-2 items-center shadow"
    >
      <div className="col-span-2">
        <div className="flex items-center pt-1 pl-1 bg-slate-100/70 rounded-full  mb-1">
          <FcAdvertising size={16} className="-translate-y-1 mr-1" />
          <p className="text-[13px] text-cyan-950 text-ellipsis overflow-hidden line-clamp-1 mb-1">
            {challengeData.title}
          </p>
        </div>

        <p className="text-ellipsis text-xs pl-1 font-light text-gray-600 overflow-hidden">
          {challengeData.challengeContent}
        </p>
      </div>
      <div className=" col-span-1 h-1/2 pl-1 flex items-center justify-start">
        <GoGoal size={15} className="text-pink-800 mr-2" />
        <p className="text-[14px] pt-0.5 text-cyan-950">
          {challengeData.goalAmount.toLocaleString("ko-KR")} 원
        </p>
      </div>
      <div className=" col-span-1 h-1/2 text-right -translate-y-4">
        <div className="flex justify-end items-center text-[12px] text-cyan-950 text-ellipsis overflow-hidden line-clamp-1">
          <CgSandClock className="mr-0.5 text-orange-600" />
          <p className="pt-0.5 text-cyan-700">모집 마감 D-{stardDDay}</p>
        </div>
        <div className="flex items-center justify-end mr-1">
          <BsPersonFill size={15} className="mr-1 text-gray-400" />
          <p className="text-cyan-700 text-xs text-ellipsis overflow-hidden pt-0.5">
            {challengeData.cnt} / {challengeData.maxPeople}
          </p>
        </div>
      </div>
    </div>
  );
}
