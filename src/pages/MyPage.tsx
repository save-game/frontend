import styled from 'styled-components';
import tw from 'twin.macro';

export default function MyPage() {
  return (
    <div>
      <div>hi</div>
      <Button>test</Button>
    </div>
  );
}

const Button = styled.button`
  padding: 8px;
  ${tw`font-bold text-accent`};
`;
