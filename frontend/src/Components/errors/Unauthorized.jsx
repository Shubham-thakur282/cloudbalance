// import forbidden from "../../assets/forbidden.svg"; // Ensure this image exists in the specified path
import { useNavigate } from "react-router-dom";
import "../../scss/error404.scss"; // Create and style this SCSS file accordingly

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard"); // Redirect to an appropriate page
  };
  return (
    <div className="error-page">
      <div className="error-page-wrapper">
        <div className="error-left">
          <img src={forbidden} alt="Forbidden access" height="600" />
        </div>
        <div className="error-right">
          <div className="error-right-wrapper">
            <div className="error-right-div">
              <div className="error-right-div-wrapper">
                <h1>403 - Forbidden</h1>
                <p>
                  Sorry, you don't have permission to access this page. Please contact the administrator if you believe this is an error.
                </p>
              </div>
            </div>
            <div className="error-right-btn-div">
              <button className="error-right-btn" onClick={handleClick}>
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
