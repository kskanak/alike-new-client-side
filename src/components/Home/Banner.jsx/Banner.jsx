import React from "react";
import img from "../../../assets/images/home-banner.jpg";

const Banner = () => {
  return (
    <div>
      <div
        className="hero h-[600px]"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold"> Alike New</h1>
            <p className="mb-5">Welcome to Alike New</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
