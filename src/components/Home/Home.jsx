import React from "react";
import AdvertiseProducts from "./AdvertiseProduct/AdvertiseProducts";
import Banner from "./Banner.jsx/Banner";
import Catagories from "./Catagories/Catagories";
import OurStates from "./OurStates/OurStates";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Catagories></Catagories>
      <AdvertiseProducts></AdvertiseProducts>
      <OurStates></OurStates>
    </div>
  );
};

export default Home;
