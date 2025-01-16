import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Search from "../Search";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EditCampModal from "./EditCampModal";
import { Spinner } from "@material-tailwind/react";

const fetchCamps = async (axiosPublic) => {
  const response = await axiosPublic.get("/camps");
  return response.data.camps;
};

const ManageCamps = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data, status, error, refetch } = useQuery({
    queryKey: ["camps"],
    queryFn: () => fetchCamps(axiosPublic),
    refetchOnWindowFocus: true,
  });
  console.log(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [campsPerPage] = useState(10);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCamps, setCurrentCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCamps(data || []);
    }
  }, [searchTerm, data]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredData = data.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.professionalName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCurrentCamps(filteredData);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this camp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-camp/${id}`)
          .then(() => {
            setFilteredCamps((prevCamps) =>
              prevCamps.filter((camp) => camp._id !== id)
            );

            if (data) {
              setFilteredCamps((prevData) =>
                prevData.filter((camp) => camp._id !== id)
              );
            }
            Swal.fire({
              title: "Deleted!",
              text: "The camp has been deleted.",
              icon: "success",
            });
            setCurrentPage(1);
          })
          .catch((err) => {
            console.error("Error deleting camp", err);
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the camp.",
              icon: "error",
            });
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "The camp has not been deleted.",
          icon: "info",
        });
      }
    });
  };

  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;

  useEffect(() => {
    setCurrentCamps(
      (filteredCamps.length ? filteredCamps : data)?.slice(
        indexOfFirstCamp,
        indexOfLastCamp
      ) || []
    );
  }, [data, filteredCamps, indexOfFirstCamp, indexOfLastCamp]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(
    (filteredCamps.length || data?.length || 0) / campsPerPage
  );
  const handleEdit = (camp) => {
    setSelectedCamp(camp);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!filteredCamps.length && data) {
      setFilteredCamps(data);
    }
  }, [data, filteredCamps.length]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  if (status === "error") {
    return <p>Error fetching camps: {error.message}</p>;
  }

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Camps</h2>

      <Search onSearch={handleSearch} title="camp" />

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Camp Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Healthcare Professional</th>
              <th className="p-3 text-left">Participants</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps.length > 0 ? (
              currentCamps.map((camp) => (
                <tr key={camp._id} className="border-b">
                  <td className="p-3">{camp.campName}</td>
                  <td className="p-3">
                    {new Date(camp.dateTime).toLocaleString()}
                  </td>
                  <td className="p-3">{camp.location}</td>
                  <td className="p-3">{camp.professionalName}</td>
                  <td className="p-3">{camp.participantCount}</td>
                  <td className="p-3 flex items-center">
                    <Link
                      onClick={() => handleEdit(camp)}
                      className="text-primary hover:text-accent mr-4"
                    >
                      Edit
                    </Link>
                    |
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No matching data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`p-1 mx-1 rounded-lg ${
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
          className="p-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <EditCampModal
          camp={selectedCamp}
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
          setFilteredCamps={setFilteredCamps}
        />
      )}
    </div>
  );
};

export default ManageCamps;
