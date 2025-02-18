import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Services() {
  const services = [
    {
      id: 1,
      title: "Health Checkups",
      description:
        "Comprehensive health checkups including blood pressure, sugar levels, and more.",
    },
    {
      id: 2,
      title: "Vaccinations",
      description:
        "Vaccinations for children and adults to prevent various diseases.",
    },
    {
      id: 3,
      title: "Health Education",
      description:
        "Educational sessions on managing chronic conditions like diabetes and hypertension.",
    },
    {
      id: 4,
      title: "Specialist Consultations",
      description:
        "Consultations with specialists in various fields of medicine.",
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
          Our Services
        </Typography>
      </CardHeader>
      <Card className="w-full shadow-lg">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 shadow-md">
                <Typography variant="h5" className="mb-2">
                  {service.title}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {service.description}
                </Typography>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
