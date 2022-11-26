import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CatagoryItemCard from "./CatagoryItemCard";

const CatagoryItem = () => {
  const items = useLoaderData();

  const [catagoryName, setCatagoryName] = useState("");

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold my-4">
        {catagoryName} Bikes List
      </h2>
      <div className="bikes">
        {items.map((item) => (
          <CatagoryItemCard
            key={item._id}
            item={item}
            setCatagoryName={setCatagoryName}
          ></CatagoryItemCard>
        ))}
      </div>
    </div>
  );
};

export default CatagoryItem;
