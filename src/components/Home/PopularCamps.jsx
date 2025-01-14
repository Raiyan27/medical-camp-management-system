import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fetchCamps = async () => {
  const axiosPublic = useAxiosPublic();

  try {
    const response = await axiosPublic.get("/camps");
    if (response.status !== 200) {
      throw new Error("Failed to fetch camps");
    }
    return response.data.camps.slice(0, 6);
  } catch (error) {
    throw new Error("Error fetching camps: " + error.message);
  }
};

const PopularCamps = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: fetchCamps,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading camps: {error.message}</p>;

  return (
    <section className="container mx-auto py-8 px-8 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-center my-12">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((camp) => (
          <div
            key={camp._id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{camp.campName}</h3>
              <p className="text-sm text-gray-600">Date: {camp.dateTime}</p>
              <p className="text-sm text-gray-600">Location: {camp.location}</p>
              <p className="text-sm text-gray-600">
                Participants: {camp.participantCount}
              </p>
              <Link
                to={`/camp-details/${camp._id}`}
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
