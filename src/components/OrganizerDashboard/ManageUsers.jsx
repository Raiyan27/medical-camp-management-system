import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Search from "../Search";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fetchRegistrations = async (axiosPublic) => {
  const response = await axiosPublic.get("/get-all-registrations");
  return response.data.registrations;
};

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { data, status, error } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchRegistrations(axiosPublic),
  });

  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationsPerPage] = useState(10);

  const handleSearch = (searchTerm) => {
    const filteredData = data.filter(
      (reg) =>
        reg.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.confirmationStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRegistrations(filteredData);
    setCurrentPage(1);
  };

  const handleConfirm = (id) => {
    const updatedRegistrations = data.map((reg) =>
      reg.id === id ? { ...reg, confirmationStatus: "Confirmed" } : reg
    );
    setFilteredRegistrations(updatedRegistrations);
  };

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this registration?")) {
      const updatedRegistrations = data.filter((reg) => reg.id !== id);
      setFilteredRegistrations(updatedRegistrations);
    }
  };

  const indexOfLastRegistration = currentPage * registrationsPerPage;
  const indexOfFirstRegistration =
    indexOfLastRegistration - registrationsPerPage;
  const currentRegistrations = filteredRegistrations.slice(
    indexOfFirstRegistration,
    indexOfLastRegistration
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(
    filteredRegistrations.length / registrationsPerPage
  );

  if (status === "loading") {
    return <p>Loading registrations...</p>;
  }

  if (status === "error") {
    return <p>Error fetching registrations: {error.message}</p>;
  }

  if (data && filteredRegistrations.length === 0) {
    setFilteredRegistrations(data);
  }

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Registered Camps</h2>

      <Search onSearch={handleSearch} />

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Participant Name</th>
              <th className="p-3 text-left">Camp Name</th>
              <th className="p-3 text-left">Camp Fees</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Confirmation Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="p-3">{reg.userName}</td>
                <td className="p-3">{reg.campName}</td>
                <td className="p-3">{reg.fees}</td>
                <td className="p-3">
                  <span
                    className={`${
                      reg.paymentStatus === "Paid"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {reg.paymentStatus}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleConfirm(reg.id)}
                    className={`${
                      reg.confirmationStatus === "Confirmed"
                        ? "text-green-500 cursor-not-allowed"
                        : "text-blue-500"
                    }`}
                    disabled={reg.confirmationStatus === "Confirmed"}
                  >
                    {reg.confirmationStatus}
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleCancel(reg.id)}
                    className={`${
                      reg.paymentStatus === "Paid" &&
                      reg.confirmationStatus === "Confirmed"
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-red-500"
                    }`}
                    disabled={
                      reg.paymentStatus === "Paid" &&
                      reg.confirmationStatus === "Confirmed"
                    }
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
