import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AiTwotoneHome } from "react-icons/Ai";
import { RiBookletLine } from "react-icons/Ri";
import { BsPersonFill } from "react-icons/Bs";
import { GiSevenPointedStar } from "react-icons/Gi";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  ${tw`btm-nav bg-light-color shadow-inner shadow-[#e0edea]`}
`;

const NavBtn = styled.button<{ selected: boolean }>`
  ${tw`text-xs text-neutral-400`}
  ${({ selected }) => selected && tw`text-accent font-bold`}
`;
const icons = {
  홈: <AiTwotoneHome size="20" />,
  챌린지: <GiSevenPointedStar size="20" />,
  가계부: <RiBookletLine size="20" />,
  마이페이지: <BsPersonFill size="23" />,
} as const;
type NavMenu = keyof typeof icons;

interface Menu {
  name: NavMenu;
  pathname: string;
}

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname !== "/" ? true : false;
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const menuList: Menu[] = [
    { name: "홈", pathname: "/home" },
    { name: "챌린지", pathname: "/challenge" },
    { name: "가계부", pathname: "/account" },
    { name: "마이페이지", pathname: "/mypage" },
  ];

  useEffect(() => {
    const path = menuList.find((item) => item.pathname === pathname);
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
