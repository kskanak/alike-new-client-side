import { createBrowserRouter } from "react-router-dom";
import CatagoryItem from "../../components/Home/Catagories/CatagoryItem";
import Home from "../../components/Home/Home";
import Login from "../../components/Login.jsx/Login";
import SignUp from "../../components/SignUp/SignUp";
import Main from "../../layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/signup", element: <SignUp></SignUp> },
      { path: "/login", element: <Login></Login> },
      {
        path: "/catagory/:id",
        loader: async ({ params }) => {
          return fetch(`http://localhost:5000/catagoryItems/${params.id}`);
        },
        element: <CatagoryItem></CatagoryItem>,
      },
    ],
  },
]);

export default router;
