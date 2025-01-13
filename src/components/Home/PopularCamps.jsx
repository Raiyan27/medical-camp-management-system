import React from "react";
import { Link } from "react-router-dom";

const PopularCamps = () => {
  const placeholderCamps = [
    {
      id: 1,
      name: "Health Awareness Camp",
      image: "/camp1.jpg",
      fees: "$20",
      date: "2025-02-15",
      location: "Community Hall A",
      professional: "Dr. Alice Smith",
      participantCount: 45,
    },
    {
      id: 2,
      name: "Free Eye Checkup",
      image: "/camp2.jpg",
      fees: "$0",
      date: "2025-03-10",
      location: "City Clinic B",
      professional: "Dr. Bob Johnson",
      participantCount: 60,
    },
    {
      id: 1,
      name: "Health Awareness Camp",
      image: "/camp1.jpg",
      fees: "$20",
      date: "2025-02-15",
      location: "Community Hall A",
      professional: "Dr. Alice Smith",
      participantCount: 45,
    },
    {
      id: 2,
      name: "Free Eye Checkup",
      image: "/camp2.jpg",
      fees: "$0",
      date: "2025-03-10",
      location: "City Clinic B",
      professional: "Dr. Bob Johnson",
      participantCount: 60,
    },
    {
      id: 1,
      name: "Health Awareness Camp",
      image: "/camp1.jpg",
      fees: "$20",
      date: "2025-02-15",
      location: "Community Hall A",
      professional: "Dr. Alice Smith",
      participantCount: 45,
    },
    {
      id: 2,
      name: "Free Eye Checkup",
      image: "/camp2.jpg",
      fees: "$0",
      date: "2025-03-10",
      location: "City Clinic B",
      professional: "Dr. Bob Johnson",
      participantCount: 60,
    },
  ];

  return (
    <section className="container mx-auto py-8 px-8 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-center my-12">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderCamps.map((camp) => (
          <div
            key={camp.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{camp.name}</h3>
              <p className="text-sm text-gray-600">Date: {camp.date}</p>
              <p className="text-sm text-gray-600">Location: {camp.location}</p>
              <p className="text-sm text-gray-600">
                Participants: {camp.participantCount}
              </p>
              <Link
                to={`/camp-details/${camp.id}`}
                className="mt-4 bg-primary hover:bg-accent text-white px-4 py-2 rounded inline-block"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          to="/available-camps"
          className="bg-primary hover:bg-accent text-white px-6 py-2 rounded"
        >
          See All Camps
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
