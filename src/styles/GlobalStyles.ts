import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`



main{
  min-height: calc(100vh - 80px);
}

/* iOS only */
@supports (-webkit-touch-callout: none) {
  main{
    height: -webkit-fill-available;
    margin-bottom: 80px;
  }
}
`;

export default GlobalStyles;
