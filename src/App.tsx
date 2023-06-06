import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";

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
            <Route path="/home" element={<div>home</div>} />
            <Route path="/challenge" element={<div>challenge</div>} />
            <Route path="/account" element={<div>account</div>} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;
