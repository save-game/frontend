<<<<<<< HEAD
import { useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { AiTwotoneHome } from "react-icons/Ai";
import { TbPigMoney } from "react-icons/Tb";
import { BsPersonFill } from "react-icons/Bs";
// import { FaRankingStar } from "react-icons/Fa";

// const Button = styled.button`
//   padding: 8px;
//   background: blue;
//   ${({ color }) =>
//     color === "blue" &&
//     css`
//       color: white;
//     `};
//   ${tw`font-bold`};
// `;

// const Blackbtn = styled(Button)`
//   background: black;
// `;

const Header = styled.header`
  ${tw`btm-nav shadow-inner`}
`;

const NavBtn = styled.button<{ selected: boolean }>`
  ${({ selected }) => selected && tw`text-accent font-bold`}
  ${tw`text-xs`}
`;

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const icons = {
    홈: <AiTwotoneHome />,
    챌린지: <AiTwotoneHome />,
    가계부: <TbPigMoney />,
    마이페이지: <BsPersonFill />,
  } as const;
  type NavMenu = keyof typeof icons;
  const navMenu: NavMenu[] = ["홈", "챌린지", "가계부", "마이페이지"];

=======
import styled from 'styled-components';
import tw from 'twin.macro';

export default function MyPage() {
>>>>>>> 0be3c8d88cf1084793cd58f07d6d13339fbaa30b
  return (
    <>
      <Header>
        {navMenu.map((menu: NavMenu) => (
          <NavBtn
            onClick={() => setSelectedMenu(menu)}
            key={menu}
            selected={menu === selectedMenu}
          >
            {icons[menu]}
            {menu}
          </NavBtn>
        ))}
      </Header>
      <main>
        <div>hi</div>
        {/* <Button color={"blue"}>test</Button>
        <Blackbtn as="a">test</Blackbtn> */}
      </main>
    </>
  );
<<<<<<< HEAD
};
export default MyPage;

//w-11/12
=======
}

const Button = styled.button`
  padding: 8px;
  ${tw`font-bold text-accent`};
`;
>>>>>>> 0be3c8d88cf1084793cd58f07d6d13339fbaa30b
