import React from "react";

const JoinCampModal = ({ camp }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Join {camp.name}</h2>
        <form>
          <p>Camp Fees: {camp.fees}</p>
          <p>Location: {camp.location}</p>
          <p>Professional: {camp.professional}</p>
          <button
            type="submit"
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinCampModal;
