import { useSelector } from "react-redux";
import { logout } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/usersApi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/Cloudkeeper.svg";
import "../../scss/header.scss";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const {name,refreshToken,accessToken } = useSelector((state) => state);
  const handleClick = async () => {
    
    try {
        const res = logoutUser({refreshToken,accessToken});
        logout();
        toast.success(`${name} logged out`);
        navigate("/login");
    } catch (error) {
        toast.error("Error Occured")
    }
  };
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-wrapper">
        <div className="dashboard-header-left">
          <img src={logo} alt="" />
        </div>
        <div className="dashboard-header-right">
          <div className="header-right-wrapper">
            <div className="header-right-name-box">
              <div className="header-right-icon">
                <AccountCircleIcon fontSize="large" color="primary" />
              </div>
              <div className="header-right-name">
                <span>Welcome</span>
                <span className="user-name">{name}</span>
              </div>
            </div>
            <div className="header-right-btn">
              <button onClick={handleClick}><LogoutIcon />Logout</button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
