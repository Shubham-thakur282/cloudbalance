import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const StepRenderer = ({ details, isFinal }) => {
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // alert('Copied to clipboard!');
      toast.succewwss("Copied");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Error occured");
    }
  };

  return (
    <div className="steps">
      <div className="title-wrapper">
        <h2>{details?.title?.heading}</h2>
        <p>{details?.title?.text}</p>
      </div>
      <div className="list-wrapper">
        {details?.data.map((step, index) => (
          <div key={index} className="step-block">
            {!isFinal && (
              <div className="marker-wrapper">
                <span className="marker">{index + 1}</span>
              </div>
            )}
            <div className="main-text-content">
              {step.content && <p>{step.content}</p>}

              {/* Copy Text Section */}
              {step.copyText && (
                <div className="copy-text-wrapper">
                  <p className="copy-text">
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(step.copyText)}
                      title="Copy"
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <ContentCopyIcon />
                    </button>
                    <span>{step.copyText}</span>
                  </p>
                </div>
              )}

              {step.img && (
                <img className="form-images" src={step.img} alt="step visual" />
              )}

              {step.json && (
                <div
                  className="json-box-wrapper"
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() =>
                      handleCopy(JSON.stringify(step.json, null, 2))
                    }
                    title="Copy JSON"
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <ContentCopyIcon />
                  </button>
                  <pre className="json-box">
                    <code>{JSON.stringify(step.json, null, 2)}</code>
                  </pre>
                </div>
              )}

              {/* Input Boxes */}
              {step.inputBoxes && (
                <div className="input-form">
                  {step.inputBoxes.map((input, idx) => (
                    <div className="arn-input-box" key={idx}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        name={input.name}
                        value={input.value}
                        placeholder={input.label}
                        onChange={input.onChange}
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              {step?.icon && (
                <div className="submitted-page">
                  {step?.icon && <img src={step.icon} alt="icon" />}
                  {step?.text1 && <p>{step?.text1}</p>}
                  {step?.text2 && <p>{step?.text2}</p>}
                  <div className="submitted-page-box2">
                  {step?.text3 && <p>{step?.text3}</p>}
                  {step?.text4 && <p>{step?.text4}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepRenderer;
