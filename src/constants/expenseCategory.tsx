import { BiBowlRice } from "react-icons/Bi";
import { FaBusAlt, FaBriefcaseMedical } from "react-icons/Fa";
import { BsCart4, BsHouseFill } from "react-icons/Bs";
import { HiOutlineMusicNote } from "react-icons/Hi";
import { RiTShirt2Line, RiInkBottleLine, RiBankFill } from "react-icons/Ri";
import { ImMobile2 } from "react-icons/Im";
import { VscBook } from "react-icons/Vsc";
import { TfiEnvelope, TfiWallet } from "react-icons/Tfi";
import { MdOutlinePets } from "react-icons/Md";

export interface Category {
  category: string;
  name: string;
  icon: JSX.Element;
  color: string;
}

export const categoryList: Category[] = [
  {
    category: "food",
    name: "식비",
    icon: <BiBowlRice size={24} />,
    color: "bg-lime-300",
  },
  {
    category: "transportation",
    name: "교통",
    icon: <FaBusAlt size={19} />,
    color: "bg-green-300",
  },
  {
    category: "living",
    name: "생활",
    icon: <BsCart4 size={22} />,
    color: "bg-emerald-300",
  },
  {
    category: "house",
    name: "주거",
    icon: <BsHouseFill size={20} />,
    color: "bg-teal-300",
  },
  {
    category: "culture",
    name: "문화",
    icon: <HiOutlineMusicNote size={22} />,
    color: "bg-teal-400",
  },
  {
    category: "clothes",
    name: "의류",
    icon: <RiTShirt2Line size={22} />,
    color: "bg-cyan-300",
  },
  {
    category: "beauty",
    name: "뷰티",
    icon: <RiInkBottleLine size={23} />,
    color: "bg-cyan-400",
  },
  {
    category: "medical",
    name: "의료",
    icon: <FaBriefcaseMedical size={18} />,
    color: "bg-sky-400",
  },
  {
    category: "telecom",
    name: "통신",
    icon: <ImMobile2 size={20} />,
    color: "bg-sky-500",
  },
  {
    category: "finance",
    name: "금융",
    icon: <RiBankFill size={21} />,
    color: "bg-blue-400",
  },
  {
    category: "event",
    name: "경조사",
    icon: <TfiEnvelope size={20} />,
    color: "bg-indigo-400",
  },
  {
    category: "education",
    name: "교육",
    icon: <VscBook size={21} />,
    color: "bg-indigo-500",
  },
  {
    category: "pet",
    name: "반려동물",
    icon: <MdOutlinePets size={20} />,
    color: "bg-violet-600",
  },
];

export const ChanllegeCategoryList: Category[] = [
  {
    category: "all",
    name: "전체",
    icon: <TfiWallet size={24} />,
    color: "bg-lime-200",
  },
  {
    category: "food",
    name: "식비",
    icon: <BiBowlRice size={24} />,
    color: "bg-lime-300",
  },
  {
    category: "transportation",
    name: "교통",
    icon: <FaBusAlt size={19} />,
    color: "bg-green-300",
  },
  {
    category: "living",
    name: "생활",
    icon: <BsCart4 size={22} />,
    color: "bg-emerald-300",
  },
  {
    category: "house",
    name: "주거",
    icon: <BsHouseFill size={20} />,
    color: "bg-teal-300",
  },
  {
    category: "culture",
    name: "문화",
    icon: <HiOutlineMusicNote size={22} />,
    color: "bg-teal-400",
  },
  {
    category: "clothes",
    name: "의류",
    icon: <RiTShirt2Line size={22} />,
    color: "bg-cyan-300",
  },
  {
    category: "beauty",
    name: "뷰티",
    icon: <RiInkBottleLine size={23} />,
    color: "bg-cyan-400",
  },
  {
    category: "medical",
    name: "의료",
    icon: <FaBriefcaseMedical size={18} />,
    color: "bg-sky-400",
  },
  {
    category: "telecom",
    name: "통신",
    icon: <ImMobile2 size={20} />,
    color: "bg-sky-500",
  },
  {
    category: "finance",
    name: "금융",
    icon: <RiBankFill size={21} />,
    color: "bg-blue-400",
  },
  {
    category: "event",
    name: "경조사",
    icon: <TfiEnvelope size={20} />,
    color: "bg-indigo-400",
  },
  {
    category: "education",
    name: "교육",
    icon: <VscBook size={21} />,
    color: "bg-indigo-500",
  },
  {
    category: "pet",
    name: "반려동물",
    icon: <MdOutlinePets size={20} />,
    color: "bg-violet-600",
  },
];
