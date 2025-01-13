import React from "react";

const BannerSlider = () => {
  const slides = [
    { id: 1, image: "/placeholder-banner1.jpg", caption: "Success Story 1" },
    { id: 2, image: "/placeholder-banner2.jpg", caption: "Success Story 2" },
    { id: 3, image: "/placeholder-banner3.jpg", caption: "Impactful Moments" },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex transition-transform duration-500">
        {slides.map((slide) => (
          <div key={slide.id} className="w-full">
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full object-cover"
            />
            <p className="text-center text-white bg-black bg-opacity-50 py-2">
              {slide.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
