import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../scss/sidebar.scss";


const Sidebar = () => {
    
    const permissions = useSelector(state => state.permissions);

  return (
    <div className="sidebar">
      <nav className="nav-links">
        {permissions.map((item, index) => (
            <div key={item.id} className="nav-link-wrapper">
          <NavLink
            // key={item.id}
            to={item.permission}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.displayName}
          </NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
