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
    <div className="container mx-auto my-8 px-8 md:px-0">
      <Card className="w-full shadow-lg">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Project Insights
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-row gap-6">
            <div className="w-1/2">
              <Typography variant="h5" className="mb-2">
                Impactful Moments
              </Typography>
              <Typography variant="small" color="blue-gray">
                Our medical camps have changed lives! Hundreds of individuals
                have benefited from the services provided, from free health
                screenings to life-saving treatments.
              </Typography>
            </div>
          </div>

          <div className="mt-6">
            <Typography variant="h5" className="mb-2">
              Key Achievements
            </Typography>
            <ul className="list-disc pl-6">
              <li>Over 2000 participants served across various locations</li>
              <li>Over 500 successful surgeries performed</li>
              <li>
                Partnerships with top healthcare professionals and organizations
              </li>
            </ul>
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            type="button"
            variant="gradient"
            fullWidth
            onClick={() => alert("More details coming soon!")}
          >
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
