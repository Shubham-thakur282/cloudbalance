import { useSelector } from "react-redux";
import { Navigate, Outlet,useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated,permissions } = useSelector((state) => state);
  // const location = useLocation();

  // const pathSegments = location.pathname.split("/").filter(Boolean);
  // const lastSegment = pathSegments[pathSegments.length - 1];

  // const matchedPermission = permissions.find((perm) => perm.permission === lastSegment);

  if (!isAuthenticated) 
    return <Navigate to="/login" />;

  // if(!matchedPermission && lastSegment !== "dashboard")
  //   return <Navigate to="/unauthorized" />

  return <Outlet />;
};

export default ProtectedRoutes;
