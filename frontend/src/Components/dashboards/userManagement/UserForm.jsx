import { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { getRoles } from "../../../api/roleApi";
import { getAccounts } from "../../../api/accountsApi";
import { toast } from "react-toastify";

const UserForm = ({ initialValues, onSubmit, isEditMode = false }) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [password, setPassword] = useState(""); // Not shown in edit mode
  const [roleId, setRoleId] = useState(initialValues?.roleId || "");
  const [roles, setRoles] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState(
    initialValues?.assignedAccounts || []
  );
  const [isCustomer, setIsCustomer] = useState(false);

  //   console.log(initialValues)

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        setRoles(res?.data);
      } catch (error) {
        toast.error("Failed to load roles");
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (isCustomer) {
      const fetchAccounts = async () => {
        try {
          const res = await getAccounts();
          setAccounts(res?.data);
        } catch (error) {
          toast.error("Failed to load accounts");
        }
      };
      fetchAccounts();
    }
  }, [isCustomer]);

  useEffect(() => {
    if (roles.length && roleId) {
      const selectedRole = roles.find(
        (r) => r.id === parseInt(roleId) && r.name === "CUSTOMER"
      );
      setIsCustomer(!!selectedRole);
    }
  }, [roleId, roles]);

  const handleAccountSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedAccount = accounts.find(
      (acc) => acc.accountId === selectedId
    );
    if (
      selectedAccount &&
      !selectedAccounts.some(
        (acc) => acc.accountId === selectedAccount.accountId
      )
    ) {
      setSelectedAccounts([...selectedAccounts, selectedAccount]);
    }
  };

  const handleRemoveAccount = (id) => {
    setSelectedAccounts(selectedAccounts.filter((acc) => acc.accountId !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPayload = {
      name,
      email,
      ...(password && { password }), // only include password if set
      roleId: roleId,
      accountIds: selectedAccounts.map((acc) => acc.accountId),
    };
    // console.log(userPayload)
    onSubmit(userPayload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper">
        <div className="form-box">
          <div className="details-div">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {!isEditMode && (
            <div className="details-div">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {!isEditMode && (
            <div className="details-div">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}
        </div>

        <div className="form-box">
          <div className="details-div">
            <label>Role:</label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              {roles.map((role) => (
                <option key={role?.id} value={role?.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {isCustomer && (
            <div className="details-div accounts-grid">
              <div className="accounts-div-wrapper">
                <div className="accounts-div">
                  <label>Accounts:</label>
                  <select onChange={handleAccountSelect}>
                    <option value="">-- Choose Account --</option>
                    {accounts.map((account) => (
                      <option key={account.accountId} value={account.accountId}>
                        {account.accountName} ({account.accountId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {selectedAccounts.length !== 0 && (
                    <>
                      <label>Selected Accounts:</label>
                      <ul className="selected-list">
                        {selectedAccounts.map((acc) => (
                          <li key={acc.accountId}>
                            {acc.accountName} ({acc.accountId})
                            <button
                              type="button"
                              onClick={() => handleRemoveAccount(acc.accountId)}
                            >
                              <RemoveCircleIcon />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="submit-box">
          <button type="submit">
            {isEditMode ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
