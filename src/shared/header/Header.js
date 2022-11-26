import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign Out successfull");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const menuItem = (
    <>
      <li className="md:pl-8">
        {user?.email && (
          <p className="text-secondary-accent font-medium  md:hidden flex items-center">
            <FaUserAlt /> {user?.displayName}
          </p>
        )}
      </li>
      <li className="md:pl-8">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "py-2 md:p-2 rounded-lg bg-slate-600  text-slate-300"
              : undefined
          }
        >
          Home
        </NavLink>
      </li>

      <li className="md:pl-8">
        <NavLink
          to="/appointment"
          className={({ isActive }) =>
            isActive
              ? "py-2 md:p-2 rounded-lg bg-slate-600 text-slate-300"
              : undefined
          }
        >
          Appoinment
        </NavLink>
      </li>

      {user?.email && (
        <li className="md:pl-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "py-2 md:p-2 rounded-lg bg-slate-600 text-slate-300"
                : undefined
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li className="md:pl-8">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "py-2 md:p-2 rounded-lg bg-slate-600 text-slate-300"
              : undefined
          }
        >
          About
        </NavLink>
      </li>

      <li className="md:pl-8">
        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            isActive
              ? "py-2 md:p-2 rounded-lg bg-slate-600 text-slate-300"
              : undefined
          }
        >
          Reviews
        </NavLink>
      </li>

      <li className="md:pl-8">
        <NavLink
          to="/contactUs"
          className={({ isActive }) =>
            isActive
              ? "py-2 md:p-2 rounded-lg bg-slate-600 text-slate-300"
              : undefined
          }
        >
          Contact-Us
        </NavLink>
      </li>

      <li className="md:pl-8">
        {user?.email ? (
          <button
            className="text-secondary font-medium"
            onClick={handleSignOut}
          >
            {" "}
            SignOut
          </button>
        ) : (
          <Link to="/login" className="text-secondary-accent font-medium">
            Login
          </Link>
        )}
      </li>
    </>
  );
  return (
    <div className="p-5 md:px-24 md:py-5 relative mb-5">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            htmlFor="dashboard-drawyer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="" className="h-10 mr-1" />
            Alike New
          </Link>
          {user?.email && (
            <p className="ml-10 text-secondary-accent font-medium hidden md:flex  items-center">
              <FaUserAlt className="mr-2" /> {user?.displayName}
            </p>
          )}
        </div>
        <div className="navbar-end ">
          <div className=" hidden lg:flex">
            <ul className=" menu-horizontal p-0">{menuItem}</ul>
          </div>
          <div className="dropdown">
            <label tabIndex={1} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={2}
              className="menu menu-compact dropdown-content mt-4 absolute -ml-36 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              {menuItem}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
