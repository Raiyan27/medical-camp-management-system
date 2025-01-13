import React, { useState } from "react";
import { Link } from "react-router-dom";

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");

  const camps = [
    {
      id: 1,
      name: "Health Camp in City A",
      image: "https://placehold.co/600x400",
      date: "2025-02-20 10:00 AM",
      location: "City A",
      healthcareProfessional: "Dr. John Doe",
      participantCount: 120,
      description:
        "This camp offers free health checkups, consultations, and medications.",
    },
    {
      id: 2,
      name: "Medical Camp in City B",
      image: "https://placehold.co/600x400",
      date: "2025-03-15 9:00 AM",
      location: "City B",
      healthcareProfessional: "Dr. Jane Smith",
      participantCount: 80,
      description:
        "Join us for a day of free medical consultations and screenings.",
    },
    {
      id: 3,
      name: "Free Health Services in City C",
      image: "https://placehold.co/600x400",
      date: "2025-04-10 11:00 AM",
      location: "City C",
      healthcareProfessional: "Dr. Emily White",
      participantCount: 150,
      description:
        "Providing comprehensive medical services for people in need.",
    },
    {
      id: 4,
      name: "Community Health Camp in City D",
      image: "https://placehold.co/600x400",
      date: "2025-05-05 8:00 AM",
      location: "City D",
      healthcareProfessional: "Dr. Mark Black",
      participantCount: 200,
      description:
        "A community-focused health camp offering free treatments and checkups.",
    },
  ];

  const sortedCamps = camps.sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "most-registered") {
      return b.participantCount - a.participantCount;
    }
    if (sortBy === "camp-fees") {
      return 0;
    }
    return 0;
  });

  const filteredCamps = sortedCamps.filter((camp) =>
    camp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search Camps"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-full min-w-44 sm:w-96 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="alphabetical">Alphabetical (Camp Name)</option>
            <option value="most-registered">Most Registered</option>
            <option value="camp-fees">Camp Fees</option>
          </select>
        </div>
      </div>

      <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
        {filteredCamps.length === 0 ? (
          <p className="col-span-full text-center">
            No camps found based on your search criteria.
          </p>
        ) : (
          filteredCamps.map((camp) => (
            <div
              key={camp.id}
              className="border shadow-lg rounded-md overflow-hidden"
            >
              <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{camp.name}</h3>
                <p className="text-sm text-gray-600">
                  {camp.date} | {camp.location}
                </p>
                <p className="text-sm text-gray-600">
                  Healthcare Professional: {camp.healthcareProfessional}
                </p>
                <p className="text-sm text-gray-600 mb-4">{camp.description}</p>
                <p className="text-sm text-gray-600">
                  Participants: {camp.participantCount}
                </p>
              </div>
              <div className="p-4">
                <Link to={`/camp-details/${camp.id}`}>
                  <button className="w-full py-2 bg-blue-500 text-white rounded-md">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableCamps;
