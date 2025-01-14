import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import Search from "../Search";

const fetchRegisteredCamps = async (userEmail, axiosSecure) => {
  const response = await axiosSecure.get(
    `/get-registrations?userEmail=${userEmail}`
  );
  return response.data.registrations;
};

const RegisteredCamps = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser.email;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, status } = useQuery({
    queryKey: ["registeredCamps", currentUser.email],
    queryFn: () => fetchRegisteredCamps(currentUser.email, axiosSecure),
    enabled: !!email,
  });

  const [filteredCamps, setFilteredCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [campsPerPage] = useState(10);

  useEffect(() => {
    if (data) {
      setFilteredCamps(data);
    }
  }, [data]);

  const handlePayment = (campId) => {
    navigate(`/payment/${campId}`);
  };

  const handleCancel = (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your registration for this camp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep Registration",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/cancel-registration/${campId}`)
          .then(() => {
            Swal.fire({
              title: "Cancelled",
              text: "Your registration has been cancelled.",
              icon: "success",
            });
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

  const handleFeedback = (campId) => {
    navigate(`/feedback/${campId}`);
  };

  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCamps.length / campsPerPage);

  const handleSearch = (searchTerm) => {
    const filteredData = data.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCamps(filteredData);
    setCurrentPage(1);
  };

  if (status === "loading") return <p>Loading camps...</p>;
  if (status === "error") return <p>An error occurred</p>;

  return (
    <div className="border p-6 rounded-lg shadow-lg ">
      <h3 className="text-2xl font-semibold mb-4">Registered Camps</h3>
      <Search onSearch={handleSearch} />
      <div className="overflow-x-auto">
        <table className="min-w-full overflow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Camp Name</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Participant Name</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Confirmation Status</th>
              <th className="p-3 text-left">Actions</th>
              <th className="p-3 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps.map((camp) => (
              <tr key={camp._id} className="border-b">
                <td className="p-3">{camp.campName}</td>
                <td className="p-3">${camp.fees}</td>
                <td className="p-3">{camp.userName}</td>
                <td className="p-3">{camp.paymentStatus}</td>
                <td className="p-3">{camp.confirmationStatus}</td>
                <td className="p-3 flex items-center">
                  {camp.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handlePayment(camp._id)}
                      className="text-white bg-primary px-4 py-2 rounded-lg"
                    >
                      Pay
                    </button>
                  )}
                  {camp.paymentStatus === "paid" && (
                    <button
                      className="text-white bg-green-500 px-4 py-2 rounded-lg"
                      disabled
                    >
                      Paid
                    </button>
                  )}

                  {camp.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handleCancel(camp._id)}
                      className="text-white bg-red-500 px-4 py-2 rounded-lg ml-2"
                    >
                      Cancel
                    </button>
                  )}

                  {camp.paymentStatus === "paid" &&
                    camp.confirmationStatus === "confirmed" && (
                      <button
                        onClick={() => handleFeedback(camp._id)}
                        className="text-white bg-blue-500 px-4 py-2 rounded-lg ml-2"
                      >
                        Feedback
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
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

export default RegisteredCamps;
