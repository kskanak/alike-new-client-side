import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useUserRole from "../hooks/useUserRole";
import Header from "../shared/header/Header";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const userRole = useUserRole(user?.email);
  console.log(userRole);
  return (
    <div>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawyer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content border bg-sky-100">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawyer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="mb-2">
              <Link to="/dashboard">My Appointment</Link>
            </li>
            {isAdmin && (
              <>
                <li className="mb-2">
                  <Link to="/dashboard/sellers">Seller</Link>
                </li>
                <li className="mb-2">
                  <Link to="/dashboard/buyers">Buyers</Link>
                </li>
              </>
            )}
            {userRole === "seller" && (
              <>
                <li className="mb-2">
                  <Link to="/dashboard/addproduct">Add Product</Link>
                </li>
                <li className="mb-2">
                  <Link to="/dashboard/myproduct">My Product</Link>
                </li>
              </>
            )}
            {userRole === "buyer" && (
              <li>
                <Link to="/dashboard/myorders">My Orders</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
