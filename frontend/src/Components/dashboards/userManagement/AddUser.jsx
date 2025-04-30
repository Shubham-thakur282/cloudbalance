import React, { useEffect } from "react";
import UserForm from "./UserForm";
import { addUser } from "../../../service/usersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../scss/addUser.scss";


const AddUser = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);
  
  useEffect(()=>{
    if (!["ADMIN", "READONLY"].includes(role)) {
      navigate("/");
    }
  },[navigate,role]);

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
      toast.error(error?.response?.data || "Error Occured!");
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
