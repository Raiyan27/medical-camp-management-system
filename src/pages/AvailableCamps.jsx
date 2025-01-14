import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Search from "../components/Search";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";

const fetchCamps = async () => {
  const axiosPublic = useAxiosPublic();
  const response = await axiosPublic.get("/camps");
  return response.data?.camps || [];
};

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");

  const {
    data: camps,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: fetchCamps,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  const sortedCamps = Array.isArray(camps)
    ? camps.sort((a, b) => {
        if (sortBy === "alphabetical") {
          return a.campName?.localeCompare(b.campName) || 0;
        }
        if (sortBy === "most-registered") {
          const aParticipants = a.participantCount || 0;
          const bParticipants = b.participantCount || 0;
          return bParticipants - aParticipants;
        }
        if (sortBy === "camp-fees") {
          const aFees = a.fees || 0;
          const bFees = b.fees || 0;
          return aFees - bFees;
        }
        return 0;
      })
    : [];

  const filteredCamps = search
    ? sortedCamps.filter((camp) =>
        camp.campName?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedCamps;

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <Search onSearch={setSearch} />
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCamps.length === 0 ? (
          <p className="col-span-full text-center">
            No camps found based on your search criteria.
          </p>
        ) : (
          filteredCamps.map((camp) => (
            <div
              key={camp._id}
              className="border shadow-lg rounded-md overflow-hidden flex flex-col"
            >
              <img
                src={camp.image}
                alt={camp.campName}
                className="w-full h-48 object-cover"
              />
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold truncate">
                  {camp.campName}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex justify-center items-center">
                    <FaCalendarAlt className="text-primary" />
                    <p className="text-sm text-gray-600">
                      {new Date(camp.dateTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <IoLocation className="text-primary" /> {camp.location}
                  </div>
                </div>
                <p className="text-sm text-gray-600 my-2">
                  <div className="flex justify-start items-center gap-2">
                    <FaUserDoctor className="text-primary text-xl" />{" "}
                    <p>{camp.professionalName || "N/A"}</p>
                  </div>
                </p>
                <p className="text-sm text-gray-600 mb-4 truncate">
                  {camp.description}
                </p>
                <p className="text-sm text-gray-600">
                  <div className="flex justify-start items-center gap-2">
                    <IoIosPeople className="text-gray-600" />{" "}
                    <p>{camp.participantCount || "N/A"}</p>
                  </div>
                </p>
              </div>
              <div className="p-4">
                <Link to={`/camp-details/${camp._id}`}>
                  <button className="w-full py-2 bg-primary hover:bg-accent text-white rounded-md">
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
