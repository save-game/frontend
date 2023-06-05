import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import LoginPage from './pages/LoginPage';

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
        <Routes>
<<<<<<< HEAD
          <Route path="/mypage" element={<MyPage />} />
=======
          <Route path="/" element={<LoginPage />} />
>>>>>>> 0be3c8d88cf1084793cd58f07d6d13339fbaa30b
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
