import { useState } from "react";
import {
  pageOne,
  pageTwo,
  pageThree,
  submitPage,
} from "../../../configs/onboardingConfig";
import StepRenderer from "./StepRendrer";
import { toast } from "react-toastify";
import { addAccount } from "../../../service/accountsApi";
import "../../../scss/onboarding.scss";

const Onboarding = () => {


  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    arn: "",
    accountId: "",
    accountName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleOnboardClick = ()=>{
    console.log("clicked");
    setStep(0);
  }

  const pages = [
    pageOne(formData, handleChange),
    pageTwo,
    pageThree,
    submitPage(handleOnboardClick),
  ];



  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await addAccount(formData);
      console.log(res);
      if(res.status === 200){
        toast.success("Account onboarding successfull")
        setFormData({
          arn: "",
          accountId: "",
          accountName: "",
        });
        handleStepChange();
      }else{
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    }
  }

  const handleStepChange = () => {
    if (step === 0) {
      if (
        !formData.accountName.trim() ||
        !formData.arn.trim() ||
        !formData.accountId.trim()
      ) {
        toast.error("Please fill in all fields.");
        return;
      }
    }
    setStep(step + 1);
  };


  const isSubmit = step === pages.length - 2;
  const isFinal = step === pages.length - 1;

  return (
    <div className="onboarding-wrapper">
      <div className="multi-step-container">
        <StepRenderer isFinal={isFinal} details={pages[step]}  />

        {/* Only show nav buttons if not on final page */}
        {!isFinal && (
          <div className="nav-buttons">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)}>Back</button>
            )}

            <button
              onClick={() => {
                if (isSubmit) {
                  console.log("Submitting form data:", formData);
                  handleSubmit();
                }else{
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
