import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Search from "../Search";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const fetchRegistrations = async (axiosPublic) => {
  const response = await axiosPublic.get("/get-all-registrations");
  return response.data.registrations;
};

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data, status, error, refetch } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchRegistrations(axiosPublic),
  });

  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationsPerPage] = useState(10);

  useEffect(() => {
    if (data) {
      setFilteredRegistrations(data);
    }
  }, [data]);

  const handleSearch = (searchTerm) => {
    const filteredData = data.filter(
      (reg) =>
        reg.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.confirmationStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRegistrations(filteredData);
    setCurrentPage(1);
  };

  const handleApprove = (reg) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to approve registration for ${reg.userName} to ${reg.campName}. Do you want to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/update-registration/${reg._id}`, {
            confirmationStatus: "confirmed",
          })
          .then(() => {
            Swal.fire({
              title: "Approved!",
              text: `The registration for ${reg.userName} has been successfully approved.`,
              icon: "success",
            });
            const updatedRegistrations = filteredRegistrations.map(
              (registration) =>
                registration._id === reg._id
                  ? { ...registration, confirmationStatus: "confirmed" }
                  : registration
            );
            setFilteredRegistrations(updatedRegistrations);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "There was an error updating the registration.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep Registration",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/cancel-registration/${id}`)
          .then(() => {
            Swal.fire({
              title: "Cancelled",
              text: "The registration has been successfully cancelled.",
              icon: "success",
            });
            const updatedRegistrations = filteredRegistrations.filter(
              (reg) => reg._id !== id
            );
            setFilteredRegistrations(updatedRegistrations);
            setCurrentPage(1);
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "There was an error cancelling the registration.",
              icon: "error",
            });
          });
      }
    });
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
                      reg.paymentStatus === "paid"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {reg.paymentStatus}
                  </span>
                </td>
                <td className="p-3">
                  <p
                    className={`${
                      reg.confirmationStatus === "confirmed"
                        ? "text-green-500 cursor-not-allowed"
                        : "text-blue-500"
                    } font-semibold`}
                  >
                    {reg.confirmationStatus}
                  </p>
                </td>

                <td className="p-3 flex items-center">
                  <button
                    onClick={() => handleApprove(reg)}
                    className={`mr-4 ${
                      reg.paymentStatus === "paid" &&
                      reg.confirmationStatus === "pending"
                        ? "text-primary hover:text-accent cursor-pointer"
                        : reg.confirmationStatus === "confirmed"
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={
                      reg.paymentStatus !== "paid" ||
                      reg.confirmationStatus !== "pending"
                    }
                  >
                    Approve
                  </button>
                  |
                  <button
                    onClick={() => handleCancel(reg._id)}
                    className={`p-3 ${
                      reg.paymentStatus === "paid" ||
                      reg.confirmationStatus === "confirmed"
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-red-500 cursor-pointer"
                    }`}
                    disabled={
                      reg.paymentStatus === "paid" ||
                      reg.confirmationStatus === "confirmed"
                    }
                  >
                    Delete
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
