import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Auth/AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EditUserProfileModal from "./EditUserProfileModal";
import { Spinner } from "@material-tailwind/react";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const axiosPublic = useAxiosPublic();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userProfile", email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/user?email=${email}`);
      return response.data;
    },
    enabled: !!email,
  });

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdated = () => {
    refetch();
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Profile</h3>
      <div className="space-y-4 p-4 border rounded-xl">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={data?.name}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={data?.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Age</label>
          <input
            type="number"
            value={data?.age || ""}
            readOnly
            placeholder={data?.age ? "" : "Unavailable"}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Phone Number</label>
          <input
            type="text"
            value={data?.phoneNumber || "Unavailable"}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Gender</label>
          <input
            type="text"
            value={data?.gender || "Unavailable"}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Emergency Contact</label>
          <input
            type="text"
            value={data?.emergencyContact || "Unavailable"}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleEditProfile}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      {isEditModalOpen && (
        <EditUserProfileModal
          currentUser={currentUser}
          data={data}
          onClose={handleCloseEditModal}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
};

export default UserProfile;
