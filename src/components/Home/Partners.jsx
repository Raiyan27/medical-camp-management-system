import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function Partners() {
  const partners = [
    {
      id: 1,
      name: "HealthOrg",
      logo: "healthOrg.png",
    },
    {
      id: 2,
      name: "MediCare",
      logo: "medicare.png",
    },
    {
      id: 3,
      name: "Global Health",
      logo: "ghealth.png",
    },
    {
      id: 4,
      name: "HealthyLife",
      logo: "healtylife.png",
    },
  ];

  return (
    <div className="container mx-auto my-12 px-8 md:px-0">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Our Partners
        </Typography>
      </CardHeader>
      <Card className="w-full shadow-lg">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="flex flex-col items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-24 h-24 mb-4 rounded-full border"
                />
                <Typography variant="h6" className="text-center">
                  {partner.name}
                </Typography>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
