import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import Header from "./components/Common/Header";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/HomePage";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/challenge" element={<div>challenge</div>} />
            <Route path="/account" element={<div>account</div>} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;
