import React from "react";
import img from "../../../assets/images/home-banner.jpg";

const Banner = () => {
  return (
    <div>
      <div
        className="hero h-96 md:h-[600px]"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="md:w-full">
            <h1 className="mb-5 text-5xl font-bold"> Alike New</h1>
            <p className="mb-5">
              Welcome to Alike New. Whether you are looking for an upgrade or
              ready to sell, Used Motorcycle Store is your one-stop-shop for all
              things two-wheeled! We are passionate motorcycle enthusiasts
              changing the way that riders buy motorcycles. In an increasingly
              digital world, sometimes you need to get away, and we can help you
              do that.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
