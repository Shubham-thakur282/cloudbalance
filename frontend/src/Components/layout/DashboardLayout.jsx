import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../scss/dashboardLayout.scss";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-layout-bottom">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
