import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:5000/myorders/${user?.email}`).then((data) => {
      setMyOrders(data.data);
      setLoading(false);
    });
  }, [user?.email]);
  console.log(myOrders);
  if (loading) {
    <div className="flex items-center justify-center h-96">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    </div>;
  }
  return <div></div>;
};

export default MyOrders;
