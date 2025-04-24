export const tableColumns = {
    EC2: ["Resource ID", "Resource Name", "Region", "Status"],
    RDS: ["Resource ID", "Resource Name", "Region", "Engine", "Status"],
    ASG: ["Resource ID", "Resource Name", "Desired Capacity", "Min Size", "Max Size", "Region", "Status"]
  };
  
  export const columnKeyMap = {
    "Resource ID": "resourceId",
    "Resource Name": "resourceName",
    "Region": "region",
    "Status": "status",
    "Engine": "engine",
    "Desired Capacity": "desiredCapacity",
    "Min Size": "minSize",
    "Max Size": "maxSize"
  };
  