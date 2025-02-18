import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function AboutUs() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-8 md:px-0 py-12">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-48 place-items-center"
        >
          <Typography variant="h1" color="white" className="text-center">
            About Us
          </Typography>
          <Typography variant="lead" color="white" className="text-center mt-4">
            Dedicated to improving community health through free medical camps
            and impactful initiatives.
          </Typography>
        </CardHeader>
      </div>

      <div className="container mx-auto my-12 px-8 md:px-16 lg:px-32">
        <Card className="w-full shadow-xl border-2 border-gray-200 rounded-lg">
          <CardBody className="text-center py-8 px-6">
            <Typography
              variant="h3"
              className="text-3xl font-semibold mb-6 text-blue-600"
            >
              Our Mission
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg mb-6 text-gray-600"
            >
              To provide accessible healthcare services to underserved
              communities through free medical camps, health education, and
              partnerships with healthcare professionals.
            </Typography>

            <div className="border-t-2 border-gray-200 my-6"></div>

            <Typography
              variant="h3"
              className="text-3xl font-semibold mb-6 text-blue-600"
            >
              Our Vision
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg text-gray-600"
            >
              A world where everyone has access to quality healthcare,
              regardless of their socioeconomic status.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
