import { FiMeh } from "react-icons/fi";

export default function NoDisplayData() {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl absolute top-20 text-center w-full">
      <span>
        <FiMeh size={65} className=" text-accent mb-2" />
      </span>
      <div className="text-xl text-cyan-900">
        <p>지출내역이</p>
        <p>없어요 </p>
      </div>
    </div>
  );
}
