import { useEffect, useState } from "react";
import {
  pageOne,
  pageTwo,
  pageThree,
  submitPage,
} from "../../../configs/onboardingConfig";
import StepRenderer from "./StepRendrer";
import { toast } from "react-toastify";
import { addAccount } from "../../../service/accountsApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../scss/onboarding.scss";


const Onboarding = () => {
  const navigate = useNavigate();
  const role = useSelector(state => state.role);

  useEffect(()=>{
    if(!["ADMIN"].includes(role)){
      navigate("/");
    }
  },[role,navigate])

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    arn: "",
    accountId: "",
    accountName: "",
  });
  const [errors, setErrors] = useState({
    arn: "",
    accountId: "",
    accountName: "",
  });

  useEffect(()=>{
    const scrollDiv = document.getElementById("onboarding-wrapper");

    scrollDiv.scroll({
      top:0,
      left:0
    });
  },[step]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleOnboardClick = () => {
    // console.log("clicked");
    setStep(0);
  };

  const pages = [
    pageOne(formData, handleChange),
    pageTwo,
    pageThree,
    submitPage(handleOnboardClick),
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addAccount(formData);
      // console.log(res);
      if (res.status === 200) {
        toast.success("Account onboarding successfull");
        setFormData({
          arn: "",
          accountId: "",
          accountName: "",
        });
        handleStepChange();
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data);
    }
  };

  const handleStepChange = () => {
    let newErrors = { ...errors };

    if (step === 0) {
      if (!formData.accountName.trim()) {
        newErrors.accountName = "Account Name is required.";
      } else {
        newErrors.accountName = "";
      }

      if (!formData.arn.trim()) {
        newErrors.arn = "ARN is required.";
      } else {
        newErrors.arn = "";
      }
      const regex = /^[0-9]{12}$/;
      if (!formData.accountId.trim()) {
        newErrors.accountId = "Account ID is required.";
      } else if (!regex.test(formData.accountId.trim())) {
        newErrors.accountId = "Account ID must be a 12-digit number.";
      } else {
        newErrors.accountId = "";
      }
      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error !== "")) {
        toast.error("Please fill in all fields.");
        return;
      }
    }
    setStep(step + 1);
  };

  const isSubmit = step === pages.length - 2;
  const isFinal = step === pages.length - 1;

  return (
    <div className="onboarding-wrapper" id="onboarding-wrapper">
      <div className="multi-step-container">
        <StepRenderer isFinal={isFinal} errors={errors} details={pages[step]} />
        
        {!isFinal && (
          <div className="nav-buttons">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)}>Back</button>
            )}

            <button
              onClick={(e) => {
                if (isSubmit) {
                  // console.log("Submitting form data:", formData);
                  handleSubmit(e);
                } else {
                  handleStepChange();
                }
              }}
            >
              {isSubmit ? "Submit" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
