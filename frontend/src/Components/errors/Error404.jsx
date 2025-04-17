import notFound from "../../assets/notFound.svg";
import { useNavigate } from "react-router-dom";
import "../../scss/error404.scss";

const Error404 = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="error-page">
      <div className="error-page-wrapper">
        <div className="error-left">
          <img src={notFound} alt="error page svg" height="600" />
        </div>
        <div className="error-right">
          <div className="error-right-wrapper">
            <div className="error-right-div">
              <div className="error-right-div-wrapper">
                <h1>Uh-oh! Page Not Found</h1>
                <p>
                  We’re sorry, but it appears the page you were seeking is no
                  longer available, leading you to this troublesome Error 404
                  page!
                </p>
              </div>
            </div>
            <div className="error-right-btn-div">
              <button className="error-right-btn" onClick={handleClick}>
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
