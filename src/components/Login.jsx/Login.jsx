import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const { user, login, setloader, googleSignIn, resetPassword } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState(" ");
  const [signInUserEmail, setSignInUserEmail] = useState("");
  // const [token] = useToken(signInUserEmail);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = (data) => {
    // sign in implement
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setSignInUserEmail(data.email);
        toast.success("Logged into account");
      })
      .catch((error) => {
        toast.error(error.message);
        setloader(false);
      });
  };

  // google sign in implement

  //  userinfo saving to Db
  const saveUserInfoToDb = (name, email) => {
    const userInfo = {
      user: name,
      email: email,
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
        setSignInUserEmail(email);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleSignIn = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        saveUserInfoToDb(user.displayName, user.email);
        navigate(from, { replace: true });
        toast.success("Sign in with Google");
      })
      .catch((error) => {
        toast.error(error.message);
        setloader(false);
      });
  };

  // handle resetPassword

  const handleResetPassword = () => {
    resetPassword(email)
      .then(() => {
        toast.success("Password Reset Mail has sent");
      })
      .catch((error) => {
        toast.error(error.message);
        setloader(false);
      });
  };

  return (
    <div className="div flex justify-center items-center">
      <div className="w-full max-w-md p-7 space-y-3 rounded-xl shadow-lg  md:w-96  border border-gray-100">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-9">
          <div className="space-y-1 text-sm mb-4">
            <label
              htmlFor="email"
              className="block text-custom-slate font-medium"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              // aria-invalid={errors.mail ? "true" : "false"}
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {errors.email && <p role="alert">{errors.email?.message}</p>} */}
            {errors.email && (
              <div className=" text-red-400 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{errors.email?.message}</span>
              </div>
            )}
          </div>
          <div className="space-y-1 text-sm mb-4">
            <label
              htmlFor="password"
              className="block text-custom-slate font-medium"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or more",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <div className="flex text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{errors.password?.message}</span>
              </div>
            )}
            <label
              htmlFor="password"
              onClick={handleResetPassword}
              className="block text-sx  text-red-400 cursor-pointer"
            >
              Forgot Password?
            </label>
          </div>

          <input
            type="submit"
            className="block w-full p-3 text-center  text-white bg-emerald-400 rounded-lg cursor-pointer"
          />
        </form>
        <p className="px-6 text-xs text-center dark:text-gray-400 my-4">
          New to Alike New ?
          <Link to="/signup" className="text-secondary-accent ml-1">
            Create new account
          </Link>
        </p>

        <p className="px-3 text-sm divider dark:text-gray-400">OR</p>

        <input
          type="button"
          onClick={handleGoogleSignIn}
          value="CONTINUE WITH GOOGLE"
          className="block btn btn-success hover:text-white w-full p-3 text-center bg-white border-secondary-accent text-custom-slate mt-6  border rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
