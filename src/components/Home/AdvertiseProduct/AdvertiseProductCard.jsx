import React from "react";

const AdvertiseProductCard = ({ product }) => {
  console.log(product);
  const { img, name, orginal_price, price } = product;
  return (
    <div>
      <div className=" rounded-lg shadow-lg bg-gray-900 text-gray-100 border">
        <img
          src={img}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-80 py-4 dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
            <p className="dark:text-gray-100">Sellig Price : {price}</p>
            <p className="dark:text-gray-100">
              Original Price : {orginal_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseProductCard;
