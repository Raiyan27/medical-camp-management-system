import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Slider from "react-slick";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import the star icons

export function FeedbackAndRatings() {
  const axiosPublic = useAxiosPublic();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosPublic("/get-feedbacks");

        if (!response) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.data.slice(0, 6); // Limit to 6 feedbacks

        setFeedbacks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-700" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-700" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 px-2 md:px-0">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center text-center"
      >
        <Typography variant="h3" color="white">
          Feedback and Ratings
        </Typography>
      </CardHeader>

      <div className="w-full shadow-lg mt-12">
        <CardBody>
          <Typography variant="h5" className="mb-2 text-center">
            Feedback from our estemed contributors and visitors
          </Typography>
          {feedbacks.length === 0 ? (
            <Typography variant="paragraph" color="blue-gray">
              No feedbacks yet.
            </Typography>
          ) : (
            <Slider {...sliderSettings}>
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="px-2 py-4 flex justify-center"
                >
                  <div className="border rounded-lg p-2 bg-white shadow-md w-full h-54 flex flex-col justify-between">
                    <Typography
                      variant="h1"
                      className="font-semibold mb-2 text-center"
                    >
                      {feedback.reviewName}
                    </Typography>
                    {feedback.campName && (
                      <Typography
                        variant="body2"
                        className="text-gray-600 mb-2 text-center"
                      >
                        <strong>Camp: </strong>
                        {feedback.campName}
                      </Typography>
                    )}

                    <div className="flex text-xl items-center justify-center mb-4">
                      {renderStars(feedback.rating)}
                    </div>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex-grow h-32 text-center"
                    >
                      {feedback.review}
                    </Typography>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </CardBody>
      </div>
    </div>
  );
}
