import React from "react";

const CampDetails = () => {
  const camp = {
    id: 1,
    name: "Health Awareness Camp",
    image: "/camp-details.jpg",
    fees: "$20",
    date: "2025-02-15",
    location: "Community Hall A",
    professional: "Dr. Alice Smith",
    participantCount: 45,
    description: "A comprehensive health awareness camp for the community.",
  };

  return (
    <div className="container mx-auto py-8">
      <img
        src={camp.image}
        alt={camp.name}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold">{camp.name}</h1>
      <p>{camp.description}</p>
      <p className="text-sm text-gray-600">Date: {camp.date}</p>
      <p className="text-sm text-gray-600">Location: {camp.location}</p>
      <p className="text-sm text-gray-600">
        Participants: {camp.participantCount}
      </p>
      <div className="mt-4">
        <button className="bg-primary text-white px-4 py-2 rounded">
          Join Camp
        </button>
      </div>
    </div>
  );
};

export default CampDetails;
