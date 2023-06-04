import styled from "styled-components";
import tw from "twin.macro";

const Button = styled.button`
  padding: 8px;
  ${tw`font-bold text-accent`};
`;

const MyPage = () => {
  return (
    <div>
      <div>hi</div>
      <Button>test</Button>
    </div>
  );
};
export default MyPage;
