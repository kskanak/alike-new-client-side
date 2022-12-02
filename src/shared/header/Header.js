import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { TfiLayoutMenuV } from "react-icons/tfi";
import { CgMenuGridO, CgMenuMotion } from "react-icons/cg";

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
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "py-2 md:p-2 rounded-lg bg-slate-600 text-slate-300"
              : undefined
          }
        >
          Blog
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
          {/* <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            htmlFor="dashboard-drawyer"
          >
            <CgMenuMotion className="text-2xl" />
          </label> */}
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
              <CgMenuGridO className="text-2xl" />
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
