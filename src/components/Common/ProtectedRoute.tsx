import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLogin = localStorage.getItem("isLogin");
  return isLogin ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
