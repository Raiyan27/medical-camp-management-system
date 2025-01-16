import React from "react";
import BannerSlider from "../components/Home/BannerSlider";

import PopularCamps from "../components/Home/PopularCamps";
import { ProjectInsights } from "../components/Home/ProjectInsights";
import { FeedbackAndRatings } from "../components/Home/FeedbackAndRatings";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <PopularCamps />

      <ProjectInsights />
      <FeedbackAndRatings />
    </>
  );
};

export default Home;
