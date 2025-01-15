import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import Lottie from "lottie-react";
// import animationData from "../animations/error_animation.json";

export function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-row-reverse items-center justify-center mx-4">
      {/* <div className="ml-2 hidden md:flex">
        <Lottie animationData={animationData} loop={true} />
      </div> */}

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Oops!
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col items-center gap-4">
          <Typography variant="h5" color="gray">
            Something went wrong.
          </Typography>
          <Typography variant="small" color="gray">
            We couldn't process your request. Please try again later.
          </Typography>
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            color="blue"
            fullWidth
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>

          <Button
            variant="outlined"
            color="gray"
            fullWidth
            className="mt-3"
            onClick={() => (window.location.href = "/")}
          >
            Go Back to Home
          </Button>

          {/* <Typography variant="small" className="mt-6 flex justify-center">
            Need assistance?
            <Link to="/contact" className="ml-1 text-blue-500 font-bold">
              Contact Support
            </Link>
          </Typography> */}
        </CardFooter>
      </Card>
    </div>
  );
}
