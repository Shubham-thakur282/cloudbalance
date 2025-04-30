import React, { useEffect, useState } from "react";
import {useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserForm from "./UserForm";
import { getUser ,updateUser} from "../../../service/usersApi";
import { useSelector } from "react-redux";
import "../../../scss/addUser.scss";

const UpdateUser = () => {

  const navigate =  useNavigate();
  const role = useSelector((state) => state.role);
  const { id } = useParams(); 
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if(!["ADMIN","READONLY"].includes(role)){
      navigate("/");
    }
    
    const fetchUser = async () => {
      try {
        const res = await getUser(id);
        const user = res?.data;

        setInitialValues({
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          assignedAccounts: user.assignedAccounts || [], 
        });
      } catch (error) {
        toast.error("Failed to fetch user");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateUser = async (payload) => {
    try {
        // console.log(payload);
      const res = await updateUser(id, payload);

      if (res?.status === 200) {
        toast.success(`${payload.email} updated successfully`);
        navigate("/dashboard/users");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
        // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-user-container">
      <div className="header-box">
        <h2 className="title">Edit User</h2>
        <div className="underline" />
      </div>
      {initialValues ? (
        <UserForm
          initialValues={initialValues}
          onSubmit={handleUpdateUser}
          isEditMode={true}
        />
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UpdateUser;
