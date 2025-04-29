import { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { getRoles } from "../../../service/roleApi";
import { getAccounts } from "../../../service/accountsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserForm = ({ initialValues, onSubmit, isEditMode = false }) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(initialValues?.roleId || "");
  const [roles, setRoles] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState(
    initialValues?.assignedAccounts || []
  );
  const [isCustomer, setIsCustomer] = useState(false);
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
    accounts: ""
  });
  
  const navigate = useNavigate();

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
    const selectedId = e.target.value;
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

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", roleId: "", accounts: "" };

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      valid = false;
    }

    if (!isEditMode && !validateEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!isEditMode && password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!roleId) {
      newErrors.roleId = "Please select a role";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }

    const userPayload = {
      name: name.trim(),
      email: email.trim(),
      ...(password && { password: password.trim() }),
      roleId,
      accountIds: selectedAccounts.map((acc) => acc.accountId),
    };

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
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="details-div">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEditMode}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {!isEditMode && (
            <div className="details-div">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
          )}
        </div>

        <div className="form-box">
          <div className="details-div">
            <label>Role:</label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              {roles.map((role) => (
                <option key={role?.id} value={role?.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && <p className="error-message">{errors.roleId}</p>}
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
                  {errors.accounts && <p className="error-message">{errors.accounts}</p>}
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
          <button type="button" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
          <button type="submit">
            {isEditMode ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
