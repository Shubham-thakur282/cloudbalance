import { useEffect, useState } from "react";
import AccountDropdown from "./AccountDropdown";
import ResourceTable from "./ResourceTable";
import { getAccounts } from "../../../service/accountsApi";
// import { ec2Data } from "../../../service/awsApi";
import { awsData } from "../../../service/awsApi";
import { toast } from "react-toastify";
import "../../../scss/awsService.scss";


const AwsService = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedService, setSelectedService] = useState("EC2");
  const [isLoading, setIsLoading] = useState(true);
  const [resourceData, setResourceData] = useState([]);

  // Fetch account list
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getAccounts();
        setAccounts(res?.data || []);
        setSelectedAccount(res?.data?.[0] || null);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching accounts!");
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);

  // Fetch service resource data
  useEffect(() => {
    const fetchResources = async () => {
      if (selectedAccount?.accountId && selectedService) {
        try {
          setIsLoading(true);
          const res = await awsData(selectedService.toLowerCase(), selectedAccount.accountId);
          setResourceData(res?.data || []);
        } catch (error) {
          toast.info("Data not found");
          setResourceData([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchResources();
  }, [selectedService, selectedAccount]);

  const serviceOptions = ["EC2", "RDS", "ASG"];

  return (
    <div className="aws-container">
      <div className="header-box">
        <h2 className="title">Aws Service</h2>
        <div className="underline" />
      </div>

      <div className="bottom">
        <div className="left-panel">
          {serviceOptions.map((service) => (
            <div key={service} className="service-button">
              <button
                className={selectedService === service ? "active" : ""}
                onClick={() => setSelectedService(service)}
              >
                {service}
              </button>
            </div>
          ))}
        </div>

        <div className="right-panel">
          <AccountDropdown
            accounts={accounts}
            selectedAccount={selectedAccount}
            handleChange={setSelectedAccount}
          />
        </div>
      </div>

      {isLoading ? (
        <>Loading...</>
      ) : (
        <ResourceTable service={selectedService} data={resourceData} />
      )}
    </div>
  );
};

export default AwsService;
