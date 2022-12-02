import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import BookingModal from "./BookingModal";
import CatagoryItemCard from "./CatagoryItemCard";

const CatagoryItem = () => {
  const items = useLoaderData();
  const navigate = useNavigation();

  const [catagoryName, setCatagoryName] = useState("");
  const [item, setItem] = useState("");

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
            setItem={setItem}
            setCatagoryName={setCatagoryName}
          ></CatagoryItemCard>
        ))}
      </div>
      <BookingModal item={item}></BookingModal>
    </div>
  );
};

export default CatagoryItem;
