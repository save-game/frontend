import { CgSpinner } from "react-icons/Cg";

const LoadingSpinner = () => {
  return (
    <main className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-14">
        <CgSpinner size={38} className="animate-spin text-accent-focus  " />
      </div>
    </main>
  );
};

export default LoadingSpinner;
