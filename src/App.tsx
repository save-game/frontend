import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import Header from "./components/Common/Header";
import Home from "./pages/HomePage";
// import ChallengeRoom from "./pages/ChallengeRoom";

import ChallengeHome from "./pages/ChallengeHomePage";
import { queryClient } from "./constants/queryClient";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/challenge" element={<ChallengeHome />} />
            {/* <Route path="/challenge/:challengeId" element={<ChallengeRoom />} /> */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;
