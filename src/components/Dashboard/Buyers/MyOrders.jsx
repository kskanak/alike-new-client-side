import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://alike-new-server-side.vercel.app/myorders/${user?.email}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("alikeNewToken")}`,
        },
      })
      .then((data) => {
        setMyOrders(data.data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    <div className="flex items-center justify-center h-96">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
    </div>;
  }
  return (
    <div className="mt-28 px-14">
      <h2 className="text-2xl">My Orders</h2>

      <div className="orders grid md:grid-cols-3 gap-4 my-8">
        {myOrders?.length &&
          myOrders?.map((order, index) => {
            return (
              <div className="card card-compact  bg-base-100 shadow-xl">
                <figure>
                  <img src={order.img} alt={order.product_name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{order.product_name}</h2>
                  <p>Price : {order.sell_price} </p>
                  <div className="card-actions justify-end">
                    {order?.sell_price && !order.paid && (
                      <Link to={`/dashboard/payment/${order._id}`}>
                        <button className="btn btn-sm btn-accent">Pay</button>
                      </Link>
                    )}
                    {order?.price && order?.paid && <span>Paid</span>}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyOrders;
