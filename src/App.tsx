import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { queryClient } from "./constants/queryClient";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import Footer from "./components/Common/Footer";
import ScrollToTop from "./components/Common/ScrollToTop";

const Header = lazy(() => import("./components/Common/Header"));
const Home = lazy(() => import("./pages/HomePage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const ChallengeRoom = lazy(() => import("./pages/ChallengeRoom"));
const ChallengeHomePage = lazy(() => import("./pages/ChallengeHomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ScrollToTop />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/challenge" element={<ChallengeHomePage />} />
                <Route
                  path="/challenge/:challengeId"
                  element={<ChallengeRoom />}
                />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/mypage" element={<MyPage />} />
              </Route>
            </Routes>
          </Suspense>
          <Footer />
          <Header />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;
