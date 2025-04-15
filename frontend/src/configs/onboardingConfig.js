import { IAMRolePolicy1 } from "../constants/onboardingConstants";
import ckTunerRoleImg  from "../assets/ck-tuner-role-img.png"
import createPolicyJSON1

const pageOne =(data,handleChange)=> [
  {
    content: "Log into AWS account & Create an IAM Role.",
  },
  {
    content:
      "In the Trusted entity type section, select Custom trust policy. Replace the prefilled policy with the policy provided below -",
    json: IAMRolePolicy1
  },
  {
    content:"Click on Next to go to the Add permissions page. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on Next."
  },
  {
    content:"In the Role name field, enter the below-mentioned role name, and click on Create Role -",
    copyText:"CK-Tuner-Role-dev2"
  },
  {
    content:"Go to the newly create IAM Role and copy the Role ARN -",
    img:ckTunerRoleImg,
  },
  {
    content:"Paste the copied Role ARN below -",
    inputBox:{
        label:"Enter the IAM Role ARN *",
        type:"text",
        id:"arn",
        name:"arn",
        value:data.arn,
        onChange:handleChange,
    }
  }
];


const pageTwo = (data,handleChange)=>[
    {
      content:"Go to the Create Policy Page."
    },
    {
      content:"Click on the JSON tab and paste the following policy and click on Next:",
      json:""
    }
]
