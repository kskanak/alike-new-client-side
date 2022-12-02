import { createBrowserRouter } from "react-router-dom";
import Blog from "../../components/Blog/Blog";
import Buyers from "../../components/Dashboard/Buyers/Buyers";
import MyOrders from "../../components/Dashboard/Buyers/MyOrders";
import AddProduct from "../../components/Dashboard/Sellers/AddProduct";
import MyProducts from "../../components/Dashboard/Sellers/MyProducts";
import Sellers from "../../components/Dashboard/Sellers/Sellers";
import CatagoryItem from "../../components/Home/Catagories/CatagoryItem";
import Home from "../../components/Home/Home";
import Login from "../../components/Login.jsx/Login";
import SignUp from "../../components/SignUp/SignUp";
import Dashboard from "../../layout/Dashboard";
import Main from "../../layout/Main";
import ErrorPage from "../../shared/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/signup", element: <SignUp></SignUp> },
      { path: "/login", element: <Login></Login> },
      { path: "/blog", element: <Blog></Blog> },
      {
        path: "/catagory/:catagory",
        loader: async ({ params }) => {
          return fetch(
            `https://alike-new-server-side.vercel.app/catagoryItemss/${params.catagory}`
          );
        },
        element: (
          <PrivateRoutes>
            <CatagoryItem></CatagoryItem>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      { path: "/dashboard/sellers", element: <Sellers></Sellers> },
      { path: "/dashboard/buyers", element: <Buyers></Buyers> },
      { path: "/dashboard/addproduct", element: <AddProduct></AddProduct> },
      { path: "/dashboard/myproduct", element: <MyProducts></MyProducts> },
      { path: "/dashboard/myorders", element: <MyOrders></MyOrders> },
    ],
  },
  { path: "*", element: <ErrorPage></ErrorPage> },
]);

export default router;
