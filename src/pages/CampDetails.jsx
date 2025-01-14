import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const fetchCampDetails = async (id, axiosPublic) => {
  const response = await axiosPublic.get(`/camps/${id}`);
  return response.data.data.camp;
};

const CampDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: camp,
    error,
    status,
  } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: () => fetchCampDetails(id, axiosPublic),
    enabled: !!id,
  });

  if (status === "loading") return <p className="text-center">Loading...</p>;
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
    <div className="max-w-4xl mx-auto my-8 px-6 sm:px-12 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-100">
          <img
            src={camp.image || "https://placehold.co/600x400"}
            alt={camp.campName}
            className="w-full h-56 sm:h-72 object-cover rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {camp.campName}
          </h2>
          <p className="text-sm text-gray-600">
            <strong className="font-semibold">Location:</strong> {camp.location}{" "}
            | <strong className="font-semibold">Date & Time:</strong>{" "}
            {new Date(camp.dateTime).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-semibold">Healthcare Professional:</strong>{" "}
            {camp.professionalName}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-semibold">Fees:</strong> ${camp.fees}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-semibold">Participants Registered:</strong>{" "}
            {camp.participantCount}
          </p>

          {/* Camp Description Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              About the Camp
            </h3>
            <p className="text-sm text-gray-700">{camp.description}</p>
          </div>

          {/* Join Camp Button */}
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-accent transition duration-300 transform hover:scale-105">
              Join Camp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
