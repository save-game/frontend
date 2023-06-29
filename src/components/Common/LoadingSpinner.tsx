import { CgSpinner } from "react-icons/Cg";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <CgSpinner size={45} className="animate-spin text-accent-focus " />
    </div>
  );
};

export default LoadingSpinner;
