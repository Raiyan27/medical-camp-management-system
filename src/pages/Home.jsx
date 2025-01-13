import React from "react";
import BannerSlider from "../components/Home/BannerSlider";
import CampDetails from "../components/Home/CampDetails";
import PopularCamps from "../components/Home/PopularCamps";

const Home = () => {
  return (
    <>
      <div className="min-h-screen">Home</div>
      <BannerSlider />
      <CampDetails />
      <PopularCamps />
    </>
  );
};

export default Home;
