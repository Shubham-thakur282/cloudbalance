import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  if (!isAuthenticated) 
    return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoutes;
