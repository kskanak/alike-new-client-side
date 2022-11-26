import React from "react";

const CatagoryItemCard = ({ item, setCatagoryName, setItem }) => {
  const {
    catagory,
    catagory_id,
    condition,
    img,
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
          <h2> Added By : {seller_name}</h2>
          <h2> From : {location}</h2>
          <h2> Brand :{catagory}</h2>
          <h2> Condition : {condition}</h2>
          <h2> Uses : {years_used}</h2>
          <h2> Post-Time : {post_time}</h2>

          <div className="card-actions md:justify-end">
            <div className="price">
              <h2>Sell-price : {sell_price}</h2>
              <h2>Sell-price : {original_price} </h2>

              <label
                htmlFor="Booking-modal"
                onClick={() => setItem(item)}
                className="btn border-none  p-3 rounded-lg font-bold text-white bg-gradient-to-r from-secondary-accent to-primary-sky cursor-pointer"
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
