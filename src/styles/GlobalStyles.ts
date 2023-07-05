import { createGlobalStyle } from "styled-components";
import tw from "twin.macro";

const GlobalStyles = createGlobalStyle`

main{
  min-height: calc(100vh - 65px);
  padding-bottom: 80px;
  ${tw`bg-base-color`}
}

/* iOS only */
@supports (-webkit-touch-callout: none) {
  main{
   min-height: -webkit-fill-available;
   padding-bottom: 80px;
  }
}
`;

export default GlobalStyles;
