import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AiTwotoneHome } from "react-icons/Ai";
import { RiBookletLine } from "react-icons/Ri";
import { BsPersonFill } from "react-icons/Bs";
import { GiSevenPointedStar } from "react-icons/Gi";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  ${tw`btm-nav h-20 bg-teal-50 rounded-t-2xl`}
`;

const NavBtn = styled.button<{ selected: boolean }>`
  ${tw`text-xs text-gray-400`}
  ${({ selected }) => selected && tw`text-accent font-bold`}
`;
const icons = {
  홈: <AiTwotoneHome size="20" className="shrink-0" />,
  챌린지: <GiSevenPointedStar size="20" className="shrink-0" />,
  가계부: <RiBookletLine size="20" className="shrink-0" />,
  마이페이지: <BsPersonFill size="23" className="shrink-0" />,
} as const;
type NavMenu = keyof typeof icons;

//src\assets\savegame_300x300.png
interface Menu {
  readonly name: NavMenu;
  readonly pathname: string;
}

const menuList: Menu[] = [
  { name: "홈", pathname: "/home" },
  { name: "챌린지", pathname: "/challenge" },
  { name: "가계부", pathname: "/account" },
  { name: "마이페이지", pathname: "/mypage" },
];
const Header = () => {
  const { pathname } = useLocation();
  const path = pathname !== "/" && pathname !== "/signup" ? true : false;
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("홈");

  useEffect(() => {
    const path = menuList.find((item) => pathname.includes(item.pathname));
    if (path) {
      setSelectedMenu(path.name);
    }
  }, [pathname]);

  if (!path) {
    return null;
  }

  const selectMenu = (menu: NavMenu) => {
    setSelectedMenu(menu);
    const path = menuList.find((item) => item.name === menu);
    if (path) {
      navigate(path.pathname);
    }
  };

  return (
    <HeaderContainer>
      {menuList.map(({ name }) => (
        <NavBtn
          onClick={() => selectMenu(name)}
          key={name}
          selected={name === selectedMenu}
        >
          {icons[name]}
          {name}
        </NavBtn>
      ))}
    </HeaderContainer>
  );
};
export default Header;
