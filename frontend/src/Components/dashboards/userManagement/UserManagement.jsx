import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsers, removeUser } from "../../../service/usersApi";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../../scss/userManagement.scss";

const UserManagement = () => {
  const role = useSelector((state) => state.role);
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleNext = async () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = async () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getUserDetails = async (usersPerPage,currentPage) => {
    try {
      const response = await getUsers(usersPerPage, currentPage - 1);
      // console.log(response);
      setData(response?.data);
      setUsers(response?.data?.content || []);
      setTotalPages(response?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      toast.error("Error Occurred");
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) =>{
    try {
      const res = await removeUser(id);
      if(res.status === 200){
        toast.info("Removed");
        getUserDetails(usersPerPage,currentPage);
      }
    } catch (error) {
      toast.error("Error occured");
      console.log(error);
    }
  }

  useEffect(() => {
    getUserDetails(usersPerPage,currentPage);
  }, [currentPage]);

  return (
    <div className="user-management-container">
      <div className="user-management-container-wrapper">
        <div className="header-box">
          <h2 className="title">Users</h2>
          <div className="underline" />
        </div>

        {role === "ADMIN" && (
          <div className="actions">
            <NavLink to="create-user" className="add-user-btn">
              + Add User
            </NavLink>
          </div>
        )}

        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                {role === "ADMIN" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : users.length > 0 ? (
                users.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.role}</td>
                    <td>{item?.lastLogin}</td>
                    {role === "ADMIN" && (
                      <td className="btns-td">
                        <NavLink className="btns" to={`update-user/${item.id}`}>
                          <EditIcon />
                        </NavLink>
                        <button onClick={()=>handleDelete(item.id)} className="btns" >
                            <DeleteIcon />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No user found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!loading && users.length > 0 && (
          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
