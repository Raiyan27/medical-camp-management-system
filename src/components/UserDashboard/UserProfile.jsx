import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axiosPublic.get(`/participants/profile`);
      setProfile(response.data);
    };
    fetchProfile();
  }, [axiosPublic]);

  const handleProfileUpdate = (event) => {
    event.preventDefault();
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Edit Profile</h3>
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Profile Image URL</label>
          <input
            type="text"
            value={profile.image}
            onChange={(e) => setProfile({ ...profile, image: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-lg">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
