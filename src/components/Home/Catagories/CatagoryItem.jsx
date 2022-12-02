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

  // const { data: sellers = [] } = useQuery({
  //   queryKey: ["email", "seller"],
  //   queryFn: async () => {
  //     const res = await fetch(`http://localhost:5000/allseller`);
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  // useEffect(() => {
  //   fetch("http://localhost:5000/allseller")
  //     .then((res) => res.json())
  //     .then((data) => Setsellers(data));
  // }, []);
  // if (navigate.state === "loading") {
  //   <div className="flex items-center justify-center h-96">
  //     <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
  //   </div>;
  // }
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
