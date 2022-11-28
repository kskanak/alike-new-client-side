import React from "react";
import AdvertiseProducts from "./AdvertiseProduct/AdvertiseProducts";
import Banner from "./Banner.jsx/Banner";
import Catagories from "./Catagories/Catagories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Catagories></Catagories>
      <AdvertiseProducts></AdvertiseProducts>
    </div>
  );
};

export default Home;
