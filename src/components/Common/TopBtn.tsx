import { BiUpArrowAlt } from "react-icons/Bi";

const Topbtn = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <button
        onClick={scrollToTop}
        className="absolute w-10 h-10 rounded-full shadow-md bottom-[270px] right-1/2  translate-x-1/2  bg-base-100/90 "
      >
        <BiUpArrowAlt className="text-gray-400" size="20" />
      </button>
    </>
  );
};
export default Topbtn;
