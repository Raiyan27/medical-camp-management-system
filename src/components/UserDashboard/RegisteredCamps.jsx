import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import Search from "../Search";
import { MdDoneOutline } from "react-icons/md";
import { FeedbackDialog } from "./FeedbackDialogue";

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
  const [modalOpen, setModalOpen] = useState(false); // state to control modal visibility
  const [selectedCamp, setSelectedCamp] = useState(null); // store selected camp for feedback

  useEffect(() => {
    if (data) {
      setFilteredCamps(data);
    }
  }, [data]);

  const handlePayment = (campId) => {
    navigate(`/payment/${campId}`);
  };

  const handleCancel = (campId, paymentStatus, confirmationStatus) => {
    if (paymentStatus !== "pending" || confirmationStatus !== "pending") {
      Swal.fire({
        title: "Cannot Cancel",
        text: "You cannot cancel this registration as the payment or confirmation status is not 'pending'.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

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
            const updatedCamps = filteredCamps.filter(
              (camp) => camp._id !== campId
            );
            setFilteredCamps(updatedCamps);
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
    const camp = filteredCamps.find((camp) => camp._id === campId);
    setSelectedCamp(camp);
    setModalOpen(true);
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

  const handleFeedbackSubmit = (campId, rating, review) => {
    const updatedCamps = filteredCamps.map((camp) => {
      if (camp._id === campId) {
        return { ...camp, feedback: true, rating, review };
      }
      return camp;
    });
    setFilteredCamps(updatedCamps);
  };

  if (status === "loading") return <p>Loading camps...</p>;

  return (
    <div className="border p-6 rounded-lg shadow-lg ">
      <h3 className="text-2xl font-semibold mb-4">Registered Camps</h3>
      <Search onSearch={handleSearch} />
      {filteredCamps.length === 0 ? (
        <p className="text-center text-xl text-gray-600 mt-6">
          You are not registered to any camps.
        </p>
      ) : (
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
                  <td className="p-3">
                    <span
                      className={`${
                        camp.paymentStatus === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {camp.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <p
                      className={`${
                        camp.confirmationStatus === "confirmed"
                          ? "text-green-500 cursor-not-allowed"
                          : "text-blue-500"
                      } font-semibold`}
                    >
                      {camp.confirmationStatus}
                    </p>
                  </td>
                  <td className="p-3 flex items-center">
                    {camp.paymentStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handlePayment(camp._id)}
                          className="text-white bg-primary px-4 py-2 rounded-lg"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() =>
                            handleCancel(
                              camp._id,
                              camp.paymentStatus,
                              camp.confirmationStatus
                            )
                          }
                          className="text-white bg-red-500 px-4 py-2 rounded-lg ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {camp.paymentStatus === "paid" && (
                      <button
                        className="text-white bg-green-500 px-4 py-2 rounded-lg"
                        disabled
                      >
                        Paid
                      </button>
                    )}
                  </td>
                  <td className="p-3">
                    {camp.paymentStatus === "paid" &&
                    camp.confirmationStatus === "confirmed" ? (
                      !camp.feedback ? (
                        <button
                          onClick={() => handleFeedback(camp._id)}
                          className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                        >
                          Feedback
                        </button>
                      ) : (
                        <button
                          disabled
                          className="text-white bg-green-500 px-4 py-2 rounded-lg flex items-center"
                        >
                          Done <MdDoneOutline className="ml-2" />
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="text-white bg-gray-500 px-4 py-2 rounded-lg"
                      >
                        Unavailable
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

      {selectedCamp && (
        <FeedbackDialog
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          camp={selectedCamp}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default RegisteredCamps;
