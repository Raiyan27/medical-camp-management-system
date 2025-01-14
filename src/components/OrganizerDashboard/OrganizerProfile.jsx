import React from "react";

const OrganizerProfile = () => {
  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Organizer Profile</h2>
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
      {/* Add more profile details here */}
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </div>
  );
};

export default OrganizerProfile;
