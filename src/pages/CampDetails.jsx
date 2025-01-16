import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthContext";
import JoinInfoModal from "../components/JoinInfoModal";
import { Spinner } from "@material-tailwind/react";

const fetchCampDetails = async (id, axiosPublic) => {
  const response = await axiosPublic.get(`/camps/${id}`);
  return response.data.data.camp;
};

const CampDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: camp,
    error,
    status,
  } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: () => fetchCampDetails(id, axiosPublic),
    enabled: !!id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinCamp = () => {
    if (!currentUser) {
      Swal.fire({
        title: "You are not logged in",
        text: "Please log in to join this camp.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/join-us");
        }
      });
    } else {
      setIsModalOpen(true);
    }
  };

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  if (status === "error")
    return (
      <p className="text-center text-red-500">
        An error occurred: {error.message}
      </p>
    );

  if (!camp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Camp details not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto my-8 px-6 sm:px-12 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-100">
          <img
            src={camp.image || "https://placehold.co/600x400"}
            alt={camp.campName}
            className="w-full h-64 sm:h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
            {camp.campName}
          </h2>
          <p className="text-sm lg:text-base text-gray-600">
            <strong className="font-semibold">Location:</strong> {camp.location}{" "}
            |<strong className="font-semibold"> Date & Time:</strong>{" "}
            {new Date(camp.dateTime).toLocaleString()}
          </p>
          <p className="text-sm lg:text-base text-gray-600">
            <strong className="font-semibold">Healthcare Professional:</strong>{" "}
            {camp.professionalName}
          </p>
          <p className="text-sm lg:text-base text-gray-600">
            <strong className="font-semibold">Fees:</strong> ${camp.fees}
          </p>
          <p className="text-sm lg:text-base text-gray-600">
            <strong className="font-semibold">Participants Registered:</strong>{" "}
            {camp.participantCount}
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
              About the Camp
            </h3>
            <p className="text-sm lg:text-base text-gray-700">
              {camp.description}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              className="px-8 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-accent transition duration-300 transform hover:scale-105"
              onClick={handleJoinCamp}
            >
              Join Camp
            </button>
          </div>
        </div>
      </div>

      <JoinInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        camp={camp}
        user={currentUser}
        onSubmit={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CampDetails;
