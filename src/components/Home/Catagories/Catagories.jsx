import React from "react";
import yamaha from "../../../assets/images/catagories/yamaha.jpg";
import honda from "../../../assets/images/catagories/honda.jpg";
import tvs from "../../../assets/images/catagories/tvs.jpg";

const Catagories = () => {
  const catagories = [
    {
      id: 1,
      name: "Yamaha",
      icon: yamaha,
      bgClass: "bg-gradient-to-r from-primary-sky to-secondary-accent",
    },
    {
      id: 2,
      name: "Honda",
      icon: honda,
      bgClass: "bg-custom-slate",
    },
    {
      id: 3,
      name: "TVS",
      icon: tvs,
      bgClass: "bg-gradient-to-r from-secondary-accent to-primary-sky",
    },
  ];
  return <div>catagories</div>;
};

export default Catagories;
