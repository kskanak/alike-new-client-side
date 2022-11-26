import { createBrowserRouter } from "react-router-dom";
import CatagoryItem from "../../components/Home/Catagories/CatagoryItem";
import Home from "../../components/Home/Home";
import Main from "../../layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
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
