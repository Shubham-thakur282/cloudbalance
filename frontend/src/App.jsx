import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Error404 from "./Components/errors/Error404";
import ProtectedRoutes from "./Components/protected/ProtectedRoutes";
import Unauthorized from "./Components/errors/Unauthorized";
import DashboardLayout from "./Components/layout/DashboardLayout";
import UserManagement from "./Components/dashboards/userManagement/UserManagement";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import AddUser from "./Components/dashboards/userManagement/AddUser";
import UpdateUser from "./Components/dashboards/userManagement/UpdateUser";
import Onboarding from "./Components/dashboards/onboarding/Onboarding";
import AwsService from "./Components/dashboards/awsService/AwsService";
import GlobalInterceptor from "./Components/errors/GlobalInterceptor";
import CostExplorer from "./Components/dashboards/costExplorer/CostExplorer";

function App() {
  const role = useSelector((state) => state.role);
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index
              element={role === "CUSTOMER" ? (
                  <Navigate to="cost-explorer" />
                ) : (
                  <Navigate to="users" />
                )}
            />
            <Route path="users">
              <Route index element={<UserManagement />} />
              <Route path="create-user" element={<AddUser />} />
              <Route path="update-user/:id" element={<UpdateUser />} />
            </Route>

            <Route path="onboarding" element={<Onboarding />} />
            <Route path="cost-explorer" element={<CostExplorer />} />
            <Route path="aws-services" element={<AwsService />} />
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <GlobalInterceptor /> */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
  );
}

export default App;
