import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import logo from "../../assets/Cloudkeeper.svg";
import Footer from "../footer/Footer";
import { loginUser } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../scss/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated  = useSelector((state) => state.isAuthenticated);
  const obj = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(obj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email.trim() || !user.password.trim()) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      const res = await loginUser(user, dispatch);
      console.log("response came from api");
      console.log(res);
      dispatch(login(res?.data));
      toast.success("logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data || error?.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="login-page">
      <div className="form-footer-wrapper">
        <div className="login-wrapper">
          <div className="ck-logo">
            <img src={logo} alt="" />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-wrapper">
              <InputBox
                name="email"
                label="Email"
                type="text"
                value={user.email}
                onChange={handleChange}
              />
              <InputBox
                name="password"
                label="Password"
                type="password"
                value={user.password}
                onChange={handleChange}
              />

              <div className="login-btn">
                <button>LOGIN</button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
