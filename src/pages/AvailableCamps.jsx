import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Search from "../components/Search";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt, FaTh, FaThLarge, FaThList } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { Spinner } from "@material-tailwind/react";
import Select from "react-select";

const fetchCamps = async () => {
  const axiosPublic = useAxiosPublic();
  const response = await axiosPublic.get("/camps");
  return response.data?.camps || [];
};

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [layout, setLayout] = useState("three-columns");

  const {
    data: camps,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: fetchCamps,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );

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
    ? sortedCamps.filter(
        (camp) =>
          camp.campName?.toLowerCase().includes(search.toLowerCase()) ||
          camp.location?.toLowerCase().includes(search.toLowerCase())
      )
    : sortedCamps;

  const options = [
    { value: "alphabetical", label: "Alphabetical (Camp Name)" },
    { value: "most-registered", label: "Most Registered" },
    { value: "camp-fees", label: "Camp Fees" },
  ];

  const handleSortChange = (selectedOption) => {
    setSortBy(selectedOption.value);
  };

  const toggleLayout = () => {
    setLayout(layout === "three-columns" ? "two-columns" : "three-columns");
  };

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="mt-4 w-full md:w-2/4">
          <Search onSearch={setSearch} />
        </div>
        <div className="hidden md:flex flex-1 justify-end mb-6 mr-4 mt-6">
          <button
            onClick={toggleLayout}
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-accent"
          >
            {layout === "three-columns" ? (
              <FaTh className="text-xl" />
            ) : (
              <FaThLarge className="text-xl" />
            )}
          </button>
        </div>
        <Select
          value={options.find((option) => option.value === sortBy)}
          onChange={handleSortChange}
          options={options}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div
        className={`grid gap-6 grid-cols-1 ${
          layout === "three-columns" ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {filteredCamps.length === 0 ? (
          <p className="col-span-full text-center text-4xl">
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
                    <FaCalendarAlt className="text-primary mr-1" />
                    <p className="text-sm text-gray-600">
                      {new Date(camp.dateTime).toLocaleString().slice(0, 16)}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <IoLocation className="text-primary mr-1" /> {camp.location}
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
                    <p>{camp.participantCount}</p>
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
