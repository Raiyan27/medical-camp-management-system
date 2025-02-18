import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

export function MeetTheTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. John Smith",
      role: "Chief Medical Officer",
      image:
        "https://img.freepik.com/free-photo/portrait-hansome-young-male-doctor-man_171337-5068.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Camp Organizer",
      image:
        "https://img.freepik.com/free-photo/portrait-young-doctor-hospital_23-2148352012.jpg?semt=ais_hybrid",
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Volunteer Coordinator",
      image:
        "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
    },
    {
      id: 4,
      name: "Dr. Michael Brown",
      role: "Senior Physician",
      image:
        "https://img.freepik.com/free-photo/portrait-male-doctor_23-2148480369.jpg",
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
          Meet Our Team
        </Typography>
      </CardHeader>
      <Card className="w-full shadow-lg">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <Avatar
                  src={member.image}
                  alt={member.name}
                  size="xxl"
                  className="mx-auto mb-4"
                />
                <Typography variant="h5" className="mb-2">
                  {member.name}
                </Typography>
                <Typography variant="paragraph" color="blue-gray">
                  {member.role}
                </Typography>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
