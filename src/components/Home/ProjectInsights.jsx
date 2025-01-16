import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ProjectInsights() {
  return (
    <div className="container mx-auto my-8 px-8 md:px-0 mb-32">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center my-12"
      >
        <Typography variant="h3" color="white">
          Project Insights
        </Typography>
      </CardHeader>
      <Card className="w-full shadow-lg">
        <CardBody className="flex flex-col justify-center items-center">
          <div>
            <div>
              <Typography variant="h5" className="mb-2 text-center">
                Impactful Moments
              </Typography>
              <Typography variant="small" color="blue-gray">
                <p className="text-center">
                  Our medical camps have changed lives!
                </p>{" "}
                <p className="text-center">
                  Hundreds of individuals have benefited from the services
                  provided, from free health screenings to life-saving
                  treatments.
                </p>
              </Typography>
            </div>
            <div className="mt-12 text-center">
              <Typography variant="h5" className="mb-2">
                Key Achievements
              </Typography>
              <ul className="text-center">
                <li>Over 100s participants served across various locations</li>
                <li>Over 50 successful medical camps hosted</li>
                <li>
                  Partnerships with top healthcare professionals and
                  organizations
                </li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
