import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
