import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const ImpactfulStories = () => {
  return (
    <div className="container mx-auto my-8 px-8 md:px-0">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center text-center"
      >
        <Typography variant="h3" color="white">
          Impactful Stories
        </Typography>
      </CardHeader>
      <Card className="w-full shadow-lg">
        <CardBody className="flex flex-col items-center">
          <Typography variant="h5" className="mb-4 text-center">
            Life-Changing Experiences from Our Participants
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-4 text-center"
          >
            Our medical camps have transformed lives. Here are a few powerful
            stories shared by our participants:
          </Typography>
          <div className="space-y-6">
            <div>
              <Typography variant="h6" className="font-semibold">
                John Doe's Journey to Better Health
              </Typography>
              <Typography variant="small" color="blue-gray">
                John came to our camp with a chronic illness that had gone
                untreated for years. After receiving a free consultation and
                treatment, John is now living a healthier, happier life.
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="font-semibold">
                Maria's Story of Hope
              </Typography>
              <Typography variant="small" color="blue-gray">
                Maria, a mother of two, attended our camp seeking help for her
                child who had been struggling with severe asthma. After
                receiving proper care and medication, Maria's child is now
                asthma-free.
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ImpactfulStories;
