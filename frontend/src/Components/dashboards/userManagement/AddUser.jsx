// import { useEffect, useState } from "react";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { getRoles } from "../../api/roleApi";
// import { toast } from "react-toastify";
// import { getAccounts } from "../../api/accountsApi";
// import { addUser } from "../../api/usersApi";
// import { useNavigate } from "react-router-dom";

// import "../../scss/addUser.scss";


// const AddUser = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [roleId, setRoleId] = useState("");
//   const [roles, setRoles] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccounts, setSelectedAccounts] = useState([]);
//   const [isCustomer, setIsCustomer] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const res = await getRoles();
//         setRoles(res?.data);
//       } catch (error) {
//         toast.error("Error occured");
//       }
//     };
//     fetchRoles();

//     if (isCustomer) {
//       const fetchAccounts = async () => {
//         try {
//           const res = await getAccounts();
//           setAccounts(res?.data);
//           console.log(res?.data);
//         } catch (error) {
//           toast.error("Error occured");
//         }
//       };
//       fetchAccounts();
//     }
//   }, [isCustomer]);

//   const handleAccountSelect = (e) => {
//     const selectedId = parseInt(e.target.value);
//     console.log(selectedId);
//     const selectedAccount = accounts.find(
//       (acc) => acc.accountId === selectedId
//     );
//     if (
//       selectedAccount &&
//       !selectedAccounts.some(
//         (acc) => acc.accountId === selectedAccount.accountId
//       )
//     ) {
//       setSelectedAccounts([...selectedAccounts, selectedAccount]);
//     }
//   };

//   const handleRemoveAccount = (id) => {
//     setSelectedAccounts(selectedAccounts.filter((acc) => acc.accountId !== id));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userPayload = {
//       name,
//       email,
//       password,
//       role: roleId,
//       accountIds: selectedAccounts.map((acc) => acc.accountId),
//     };
//     console.log(userPayload);

//     try {
//       const res = await addUser(userPayload);
//       console.log(res);
//       if (res.status === 200) {
//         toast.success(`${email} added successfully`);
//         navigate("/dashboard/users");
//       } else {
//         throw new error("Error occured");
//       }
//     } catch (error) {
//       toast.error("error occured");
//     }
//   };

//   const handleSelectRole = (e) => {
//     setRoleId(e.target.value);
//     const selectedRole = roles.find(
//       (r) => r.id === parseInt(e.target.value) && r.name == "CUSTOMER"
//     );
//     setIsCustomer(selectedRole);
//   };

//   //   const isCustomer = true;

//   return (
//     <div className="add-user-container">
//       <div className="header-box">
//         <h2 className="title">Add User</h2>
//         <div className="underline" />
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="form-wrapper">
//           <div className="form-box">
//             {/* Email & Password */}
//             <div className="details-div">
//               <label>Name:</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="details-div">
//               <label>Email:</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="details-div">
//               <label>Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="form-box">
//             {/* Role & Accounts */}
//             <div className="details-div">
//               <label>Role:</label>
//               <select value={roleId} onChange={(e) => handleSelectRole(e)}>
//                 <option value="">-- Select Role --</option>
//                 {roles.map((role) => (
//                   <option key={role?.id} value={role?.id}>
//                     {role.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {isCustomer && (
//               <div className="details-div accounts-grid">
//                 <div className="accounts-div-wrapper">
//                   <div className="accounts-div">
//                     <label>Accounts:</label>
//                     <select onChange={handleAccountSelect}>
//                       <option value="">-- Choose Account --</option>
//                       {accounts.map((account) => (
//                         <option
//                           key={account.accountId}
//                           value={account.accountId}
//                         >
//                           {account.accountName + ` (${account.accountId})`}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     {selectedAccounts.length !== 0 && (
//                       <>
//                         <label>Selected Accounts:</label>
//                         <ul className="selected-list">
//                           {selectedAccounts.map((acc) => (
//                             <li key={acc.accountId}>
//                               {acc.accountName + ` (${acc.accountId})`}
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   handleRemoveAccount(acc.accountId)
//                                 }
//                               >
//                                 <RemoveCircleIcon />
//                               </button>
//                             </li>
//                           ))}
//                         </ul>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="submit-box">
//             <button type="submit">Add User</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddUser;


import React from "react";
import UserForm from "./UserForm";
import { addUser } from "../../../api/usersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../../scss/addUser.scss";

const AddUser = () => {
  const navigate = useNavigate();

  const handleAddUser = async (payload) => {
    try {
      const res = await addUser(payload);
      if (res.status === 200) {
        toast.success(`${payload.email} added successfully`);
        navigate("/dashboard/users");
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  return (
    <div className="add-user-container">
      <div className="header-box">
        <h2 className="title">Add User</h2>
        <div className="underline" />
      </div>
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
};

export default AddUser;
