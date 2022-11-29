import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const CatagoryItemCard = ({ item, setCatagoryName, setItem }) => {
  const { user } = useContext(AuthContext);

  const {
    data: seller = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["email", "seller"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/seller/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  const {
    catagory,
    catagory_id,
    condition,
    img,
    status,
    location,
    original_price,
    post_time,
    product_name,
    sell_price,
    seller_name,
    years_used,
  } = item;
  setCatagoryName(catagory);

  return (
    <div className="px-16 md:px-32 my-8">
      <div className="card lg:card-side bg-base-100 shadow-xl border">
        <figure>
          <img src={img} alt="Album" className="h-80" />
        </figure>

        <div className="card-body  md:justify-center">
          <h2 className="card-title">{product_name}</h2>
          <h2> Seller Name : {seller_name}</h2>
          {status === "verified" && <h2> Added By Verified Seller</h2>}
          <h2> From : {location}</h2>
          <h2> Brand :{catagory}</h2>
          <h2> Condition : {condition}</h2>
          <h2> Uses : {years_used}</h2>
          <h2> Post-Time : {post_time}</h2>

          <div className="card-actions md:justify-end">
            <div className="price">
              <h2>Sell-price : {sell_price}</h2>
              <h2>Original-price : {original_price} </h2>

              <label
                htmlFor="Booking-modal"
                onClick={() => setItem(item)}
                className="btn border-none  p-3 mt-3 rounded-lg font-bold text-white bg-gradient-to-r from-secondary-accent to-primary-sky cursor-pointer"
              >
                Book Now
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatagoryItemCard;
