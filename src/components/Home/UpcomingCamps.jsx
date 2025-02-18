import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function UpcomingCamps() {
  const upcomingCamps = [
    {
      id: 1,
      name: "Free Health Checkup Camp",
      date: "2023-12-15",
      location: "New York, NY",
      description:
        "A free health checkup camp for all ages. Services include blood pressure, sugar level, and general health checkups.",
    },
    {
      id: 2,
      name: "Diabetes Awareness Camp",
      date: "2023-12-20",
      location: "Los Angeles, CA",
      description:
        "Learn about diabetes management, prevention, and get free screenings.",
    },
    {
      id: 3,
      name: "Pediatric Health Camp",
      date: "2023-12-25",
      location: "Chicago, IL",
      description:
        "Specialized camp for children's health, including vaccinations and growth monitoring.",
    },
  ];

  return (
    <div className="container mx-auto my-28 px-8 md:px-0">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Upcoming Medical Camps
        </Typography>
      </CardHeader>
      <Card className="w-full shadow-lg">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingCamps.map((camp) => (
              <div key={camp.id} className="border rounded-lg p-4 shadow-md">
                <Typography variant="h5" className="mb-2">
                  {camp.name}
                </Typography>
                <Typography variant="small" color="blue-gray" className="mb-2">
                  <strong>Date:</strong> {camp.date}
                </Typography>
                <Typography variant="small" color="blue-gray" className="mb-2">
                  <strong>Location:</strong> {camp.location}
                </Typography>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="mb-4"
                >
                  {camp.description}
                </Typography>
                <Link to={`/camp-details/${camp.id}`}>
                  <Button color="blue" fullWidth>
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
