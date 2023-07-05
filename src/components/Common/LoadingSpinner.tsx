import { CgSpinner } from "react-icons/Cg";

const LoadingSpinner = () => {
  return (
    <main className=" flex justify-center items-center">
      <CgSpinner size={38} className="animate-spin text-accent-focus " />
    </main>
  );
};

export default LoadingSpinner;
