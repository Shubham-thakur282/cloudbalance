import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../service/usersApi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/cloudbalance.png";
import { toast } from "react-toastify";
import "../../scss/header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const refreshToken = useSelector((state) =>  state.refreshToken);
  const handleClick = async () => {
    try {
      navigate("/login");
      const accessToken = localStorage.getItem("accessToken");
      const res = logoutUser({ refreshToken, accessToken });
      dispatch(logout());
      toast.success(`${name} logged out`);
    } catch (error) {
      toast.error("Error Occured");
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
              <button onClick={handleClick}>
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
