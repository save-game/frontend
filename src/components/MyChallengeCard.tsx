import { dDayCalculator } from "../helpers/helper";

export default function MyChallengeCard({
  myChallenge,
}: {
  myChallenge: { title: string; endDate: string };
}) {
  const daysDiff = dDayCalculator(myChallenge.endDate);

  const handleClickCard = () => {
    console.log("챌린지 홈으로 이동");
  };

  return (
    <div
      className="shadow-md w-full p-4 rounded-lg h-24 mb-4 flex flex-col justify-between"
      onClick={handleClickCard}
    >
      <p>{myChallenge.title}</p>
      <p className=" text-right text-accent text-100">
        D-{daysDiff} 도전은 순항 중!
      </p>
    </div>
  );
}
