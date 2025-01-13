import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export function FeedbackAndRatings() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFeedbackSubmit = () => {
    // Simulate submitting feedback
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Feedback submitted successfully!");
      setIsLoading(false);
    }, 1500);
  };

  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment:
        "Amazing experience! The camp was well-organized, and I learned a lot.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment:
        "Great camp, but I would have appreciated more healthcare professionals present.",
    },
  ];

  return (
    <div className="container mx-auto my-8 px-8 md:px-0">
      <Card className="w-full shadow-lg">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Feedback and Ratings
          </Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h5" className="mb-4">
            What our participants say:
          </Typography>

          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="border-b py-4">
              <Typography variant="h6">{feedback.name}</Typography>
              <Typography variant="small" color="blue-gray" className="mb-2">
                Rating: {feedback.rating} / 5
              </Typography>
              <Typography variant="small" color="blue-gray">
                {feedback.comment}
              </Typography>
            </div>
          ))}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            type="button"
            variant="gradient"
            fullWidth
            onClick={handleFeedbackSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Your Feedback"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
