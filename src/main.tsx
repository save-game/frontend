import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <RecoilRoot>
      <GlobalStyles />
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
