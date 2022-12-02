import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useUserRole from "../hooks/useUserRole";
import Header from "../shared/header/Header";
import {
  AiOutlinePlusCircle,
  AiOutlineCodeSandbox,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { CgMenuMotion } from "react-icons/cg";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const userRole = useUserRole(user?.email);
  console.log(userRole);
  return (
    <div>
      <Header></Header>
      <div className="text-center">
        <label
          tabIndex={0}
          className="btn btn-ghost lg:hidden text-center"
          htmlFor="dashboard-drawyer"
        >
          <CgMenuMotion className="text-2xl" />
        </label>
      </div>
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
            {isAdmin && (
              <>
                <li className="mb-2 border-y-2 shadow-md border-y-accent">
                  <Link to="/dashboard/sellers">
                    <AiOutlineUserAdd className="text-2xl text-emerald-400" />{" "}
                    Seller
                  </Link>
                </li>
                <li className="mb-2 border-b-2 shadow-md border-y-accent">
                  <Link to="/dashboard/buyers">
                    <AiOutlineUserSwitch className="text-2xl text-emerald-400" />{" "}
                    Buyers
                  </Link>
                </li>
              </>
            )}
            {userRole === "seller" && (
              <>
                <li className="mb-2 border-y-2 shadow-md border-y-accent">
                  <Link to="/dashboard/addproduct">
                    <AiOutlinePlusCircle className="text-2xl text-emerald-400" />{" "}
                    Add Product
                  </Link>
                </li>
                <li className="mb-2 border-b-2 shadow-md border-y-accent">
                  <Link to="/dashboard/myproduct">
                    <AiOutlineCodeSandbox className="text-2xl text-emerald-400" />{" "}
                    My Product
                  </Link>
                </li>
              </>
            )}
            {userRole === "buyer" && (
              <li className="border-y-2 shadow-md border-y-accent">
                <Link to="/dashboard/myorders">
                  <AiOutlineShoppingCart className="text-2xl text-emerald-400" />{" "}
                  My Orders
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
