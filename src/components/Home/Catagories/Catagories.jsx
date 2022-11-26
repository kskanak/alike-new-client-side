import React from "react";
import yamaha from "../../../assets/images/catagories/yamaha.jpg";
import honda from "../../../assets/images/catagories/honda.jpg";
import tvs from "../../../assets/images/catagories/tvs.jpg";
import CatagorieCard from "./CatagorieCard";

const Catagories = () => {
  const bikeCatagories = [
    {
      id: 1,
      name: "Yamaha",
      icon: yamaha,
      bgClass: "bg-green-400",
    },
    {
      id: 2,
      name: "Honda",
      icon: honda,
      bgClass: "bg-emerald-400",
    },
    {
      id: 3,
      name: "TVS",
      icon: tvs,
      bgClass: "bg-green-400",
    },
  ];
  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold text-center my-4">Catagories</h2>
      <div className="catagories grid lg:grid-cols-3 md:grid-cols-2 gap-6 mx-5">
        {bikeCatagories.map((catagori) => (
          <CatagorieCard key={catagori.id} catagori={catagori}></CatagorieCard>
        ))}
      </div>
    </div>
  );
};

export default Catagories;
