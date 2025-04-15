import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const state = useSelector((state) => state);

  if (!state?.isAuthenticated) return <Navigate to="/login" />;
  // if(!allowedRoles.includes(state?.role.toString())) return <Navigate to="/unauthorized"/>;
  return <Outlet />;
};

export default ProtectedRoutes;
