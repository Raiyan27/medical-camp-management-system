import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://placehold.co/600x500",
      caption: "Success Story 1",
    },
    {
      id: 2,
      image: "https://placehold.co/600x500",
      caption: "Success Story 2",
    },
    {
      id: 3,
      image: "https://placehold.co/600x400",
      caption: "Impactful Moments",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full object-cover h-96"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white bg-black bg-opacity-50 py-2 px-4">
                {slide.caption}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
