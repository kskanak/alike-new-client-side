import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const { signUp, profileUpdate, googleSignIn, setloader, logOut } =
    useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [userRole, setUserRole] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const [createdUserEmail, setCreatedUserEmail] = useState("");

  // const [token] = useToke(createdUserEmail);

  // if (token) {
  //   navigate(from, { replace: true });
  // }

  const handleRegister = (data) => {
    // sign up implement
    signUp(data.email, data.password)
      .then((result) => {
        const user = result.user;
        handleProfileUpdate(data);
        saveUserInfoToDb(data.name, data.email, userRole);

        // logOut()
        //   .then(() => {})
        //   .catch((error) => {});
        toast.success("Account successfully created");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleProfileUpdate = (data) => {
    const profile = {
      displayName: data.name,
    };
    profileUpdate(profile)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  //  userinfo saving to Db
  const saveUserInfoToDb = (name, email, userRole) => {
    const userInfo = {
      user: name,
      email: email,
      userRole,
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleSignIn = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        if (user) {
          saveUserInfoToDb(user.displayName, user.email, userRole);
        }

        // navigate(from, { replace: true });
        toast.success("Sign in with Google");
      })
      .catch((error) => {
        toast.error(error.message);
        setloader(false);
      });
  };
  return (
    <div className="flex justify-center item -center ">
      <div className="w-full max-w-md p-7 space-y-3 rounded-xl shadow-xl border border-gray-100 md:w-[385px]">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
          {/* name input  */}
          <div className="space-y-1 text-sm mb-4">
            <label
              htmlFor="name"
              className="block dark:text-gray-400 font-medium"
            >
              Name
            </label>

            <input
              type="text"
              className="w-full px-4 py-3 rounded-md input input-bordered "
              {...register("name", { required: "User name is required" })}
            />
            {errors.name && (
              <div className="flex items-center text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.name?.message}</span>
              </div>
            )}
          </div>

          {/*email input  */}

          <div className="space-y-1 text-sm mb-4">
            <label
              htmlFor="email"
              className="block dark:text-gray-400 font-medium"
            >
              Email
            </label>

            <input
              type="email"
              className="w-full px-4 py-3 rounded-md input input-bordered "
              {...register("email", {
                required: "Must provide a Email Address",
              })}
            />
            {errors.email && (
              <div className="flex items-center text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.email?.message}</span>
              </div>
            )}
          </div>

          {/* input password */}

          <div className="space-y-1 text-sm mb-4">
            <label
              htmlFor="password"
              className="block dark:text-gray-400 font-medium"
            >
              Password
            </label>

            <input
              type="password"
              className="w-full px-4 py-3 rounded-md input input-bordered "
              {...register("password", {
                required: "Provide a Strong password",
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Should contain 1 capital, number  and special character atleast",
                },
                minLength: {
                  value: 6,
                  message: "Atleast 6 characters or more.",
                },
              })}
            />
            {errors.password && (
              <div className="flex items-center text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.password?.message}</span>
              </div>
            )}
          </div>
          {/* input user rule */}

          <div className="space-y-1 text-sm mb-4">
            <label
              htmlFor="role"
              className="block dark:text-gray-400 font-medium"
            >
              User Role
            </label>

            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option disabled selected>
                Select Role?
              </option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && (
              <div className="flex items-center text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-red-400 flex-shrink-0 w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{errors.password?.message}</span>
              </div>
            )}
          </div>

          <input type="submit" className="w-full btn " value="Register" />
          <p className="text-xs py-4 sm:px-6 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary-accent">
              Login then
            </Link>
          </p>
        </form>

        <div className="divider">OR</div>
        <input
          type=""
          onClick={handleGoogleSignIn}
          className="btn btn-success border border-secondary-accent bg-white hover:text-white w-full"
          value="CONTINUE WITH GOOGLE"
        />
      </div>
    </div>
  );
};

export default SignUp;
