import React from "react";
import {
  IAMRolePolicy1,
  createPolicyJSON1,
  createPolicyJSON2,
  createPolicyJSON3,
  createPolicyJSON4,
} from "../constants/onboardingConstants";
import ckTunerRoleImg from "../assets/ck-tuner-role-img.png";
import addPolicy from "../assets/addPolicy.png";
import policies from "../assets/policies.png";
import inlinePolicy from "../assets/inlinePolicy.png";
import reportDetails from "../assets/reportDetails.png";
import s3BucketConfig from "../assets/s3BucketConfig.png";
import reportDelivery from "../assets/reportDelivery.png";
import greenTick from "../assets/greenTick.svg";

export const pageOne = (data, handleChange) => {
  return {
    title: {
      heading: "Create an IAM Role",
      text: "Create an IAM Role by following these steps",
    },
    data: [
      {
        content: (
          <>
            Log into AWS account &{" "}
            <a
              target="_blank"
              href="https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/create?step=selectEntities"
            >
              Create an IAM Role
            </a>
            .
          </>
        ),
      },
      {
        content: (
          <>
            "In the Trusted entity type section, select{" "}
            <strong>Custom trust policy</strong>. Replace the prefilled policy
            with the policy provided below -"
          </>
        ),
        json: IAMRolePolicy1,
      },
      {
        content: (
          <>
            Click on <strong>Next</strong> to go to the Add permissions page. We
            would not be adding any permissions for now because the permission
            policy content will be dependent on the AWS Account ID retrieved
            from the IAM Role. Click on Next.
          </>
        ),
      },
      {
        content: (
          <>
            In the Role name field, enter the below-mentioned role name, and
            click on Create Role -
          </>
        ),
        copyText: "CK-Tuner-Role-dev2",
      },
      {
        content: <>Go to the newly create IAM Role and copy the Role ARN -</>,
        img: ckTunerRoleImg,
      },
      {
        content: <>Paste the copied Role ARN below -"</>,
        inputBoxes: [
          {
            label: "Enter the IAM Role ARN",
            type: "text",
            id: "arn",
            name: "arn",
            value: data.arn,
            onChange: handleChange,
            errror:"Enter arn"
          },
          {
            label: "Account id",
            type: "Text",
            id: "accountId",
            name: "accountId",
            value: data.accountId,
            onChange: handleChange,
            errror:"Enter valid account id of 12 digits",
            pattern:/^[0-9]{12}$/
          },
          {
            label: "Account name",
            type: "text",
            id: "accountName",
            name: "accountName",
            value: data.accountName,
            onChange: handleChange,
            errror:"Enter valid account name"
          },
        ],
      },
    ],
  };
};

export const pageTwo = {
  title: {
    heading: "Add Customer Managed Policies",
    text: "Create an Inline policy for the role by following these steps",
  },
  data: [
    {
      content: (
        <>
          Go to the{" "}
          <a
            target="_blank"
            href="https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/policies/create"
          >
            Create Policy
          </a>{" "}
          Page.
        </>
      ),
    },
    {
      content: (
        <>
          Click on the <strong>JSON</strong> tab and paste the following policy
          and click on Next:
        </>
      ),
      json: createPolicyJSON1,
    },
    {
      content: (
        <>
          In the <strong>Name</strong> field, enter below-mentioned policy name
          and click on Create Policy
        </>
      ),
      copyText: "cktuner-CostAuditPolicy",
    },
    {
      content: (
        <>
          Again, go to the{" "}
          <a
            target="_blank"
            href="https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/policies/create"
          >
            Create Policy
          </a>{" "}
          Page.
        </>
      ),
    },
    {
      content: (
        <>
          Click on the <strong>JSON</strong> tab and paste the following policy
          and click on Next:
        </>
      ),
      json: createPolicyJSON2,
    },
    {
      content: (
        <>
          In the <strong>Name</strong> field, enter below-mentioned policy name
          and click on Create Policy
        </>
      ),
      copyText: "cktuner-SecAuditPolicy",
    },
    {
      content: (
        <>
          Again, go to the{" "}
          <a
            target="_blank"
            href="https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/policies/create"
          >
            Create Policy
          </a>{" "}
          Page.
        </>
      ),
    },
    {
      content: (
        <>
          Click on the <strong>JSON</strong> tab and paste the following policy
          and click on Next:
        </>
      ),
      json: createPolicyJSON3,
    },
    {
      content: (
        <>
          In the <strong>Name</strong> field, enter below-mentioned policy name
          and click on Create Policy
        </>
      ),
      copyText: "cktuner-TunerReadEssentials",
    },
    {
      content: "Go to the CK-Tuner-Role",
      img: ckTunerRoleImg,
    },
    {
      content: (
        <>
          In Permission policies, click on Add{" "}
          <strong>permissions {">"} Attach Policy</strong>
        </>
      ),
      img: addPolicy,
    },
    {
      content: (
        <>
          Filter by Type {">"} Customer managed then search for
          cktuner-CostAuditPolicy,{" "}
          <strong>cktuner-SecAuditPolicy, cktuner-TunerReadEssentials</strong>{" "}
          and select them.
        </>
      ),
      img: policies,
    },
    {
      content: "Now, click on Add permissions",
    },
    {
      content: (
        <>
          In Permission policies, click on Add permissions {">"} Create inline
          policyIn Permission policies, click on{" "}
          <strong>Add permissions {">"} Create inline policy</strong>
        </>
      ),
      img: inlinePolicy,
    },
    {
      content: (
        <>
          Click on the <strong>JSON</strong> tab and paste the following policy
        </>
      ),
      json: createPolicyJSON4,
    },
    {
      content: (
        <>
          Now, click on <strong>Review policy</strong>
        </>
      ),
    },
    {
      content: (
        <>
          In the <strong>Name</strong> field, enter the below-mentioned policy
          name and click on <strong>Create Policy</strong>
        </>
      ),
      copyText: "S3CrossAccountReplication",
    },
  ],
};

export const pageThree = {
  title: {
    heading: "Create Cost & Usage Report",
    text: "Create a Cost & Usage Report by following these steps",
  },
  data: [
    {
      content: (
        <>
          Go to{" "}
          <a
            target="_blank"
            href="https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/policies/create"
          >
            Cost and Usage Reports
          </a>{" "}
          in the Billing Dashboard and click on Create report.
        </>
      ),
    },
    {
      content: (
        <>
          Name the report as shown below and select the Include resource IDs
          checkbox -
        </>
      ),
      copyText: "ck-tuner-275595855473-hourly-cur",
      img: reportDetails,
    },
    {
      content: (
        <>
          In Configure S3 Bucket, provide the name of the S3 bucket that was
          created -
        </>
      ),

      img: s3BucketConfig,
    },
    {
      content: (
        <>
          In the Delivery options section, enter the below-mentioned Report path
          prefix -
        </>
      ),
      beforeCopyText: "Report path prefix:",
      copyText: "275595855473",
      img: reportDelivery,
    },
    {
      content: (
        <>
          Click on <strong>Next</strong>. Now, review the configuration of the
          Cost and Usage Report. Once satisfied, click on{" "}
          <strong>Create Report</strong>.
        </>
      ),
    },
  ],
};

export const submitPage = (handleClick) => {
  return {
    data: [
      {
        icon: greenTick,
        text1: <>Thank you for CUR Access!</>,
        text2: (
          <>
            If you have additional accounts to onboard, please click{" "}
            <button onClick={handleClick}>Onboard</button> to proceed.
          </>
        ),
        text3: (
          <>
            Alternatively, you can begin onboarding your accounts on Tuner to
            receive usage-based recommendations.
          </>
        ),
        text4: <>Start Onboarding on Tuner</>,
      },
    ],
  };
};
