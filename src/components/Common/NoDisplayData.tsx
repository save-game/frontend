import { FiMeh } from "react-icons/fi";

export default function NoDisplayData() {
  return (
    <div className="flex items-center justify-center p-6 rounded-2xl absolute top-28 text-center w-full">
      <span>
        <FiMeh size={70} className="mr-4 text-accent" />
      </span>
      <div>
        <p className="text-5xl text-accent">데이터가</p>
        <p className="text-5xl text-accent">없어요 </p>
      </div>
    </div>
  );
}
