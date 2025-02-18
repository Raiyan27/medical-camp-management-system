import BannerSlider from "../components/Home/BannerSlider";

import PopularCamps from "../components/Home/PopularCamps";
import { ProjectInsights } from "../components/Home/ProjectInsights";
import { FeedbackAndRatings } from "../components/Home/FeedbackAndRatings";

import { UpcomingCamps } from "../components/Home/UpcomingCamps";
import { Services } from "../components/Home/Services";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <PopularCamps />
      <Services />
      <ProjectInsights />
      <UpcomingCamps />

      <FeedbackAndRatings />
    </>
  );
};

export default Home;
