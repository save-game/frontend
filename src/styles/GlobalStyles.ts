import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";

const GlobalStyles = createGlobalStyle`

main{
  min-height: calc(100vh - 65px);
  ${tw`bg-base-color`}
}

/* iOS only */
@supports (-webkit-touch-callout: none) {
  main{
    height: -webkit-fill-available;
  }
}
`;

export default GlobalStyles;
