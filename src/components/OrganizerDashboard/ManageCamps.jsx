import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Search from "../Search";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fetchCamps = async (axiosPublic) => {
  const response = await axiosPublic.get("/camps");
  return response.data.camps;
};

const ManageCamps = () => {
  const axiosPublic = useAxiosPublic();
  const { data, status, error } = useQuery({
    queryKey: ["camps"],
    queryFn: () => fetchCamps(axiosPublic),
  });

  const [filteredCamps, setFilteredCamps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [campsPerPage] = useState(10);

  const handleSearch = (searchTerm) => {
    const filteredData = data.filter(
      (camp) =>
        camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.date.includes(searchTerm) ||
        camp.professional.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCamps(filteredData);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this camp?")) {
      axiosPublic
        .delete(`/camps/${id}`)
        .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "The camp has been deleted.",
            icon: "success",
          });
          const updatedCamps = filteredCamps.filter((camp) => camp.id !== id);
          setFilteredCamps(updatedCamps);
        })
        .catch((err) => {
          console.error("Error deleting camp", err);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the camp.",
            icon: "error",
          });
        });
    }
  };

  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCamps.length / campsPerPage);
  if (status === "loading") {
    return <p>Loading camps...</p>;
  }
  if (status === "error") {
    return <p>Error fetching camps: {error.message}</p>;
  }

  if (data && filteredCamps.length === 0) {
    setFilteredCamps(data);
  }

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Camps</h2>

      <Search onSearch={handleSearch} />

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
            {currentCamps.map((camp) => (
              <tr key={camp.id} className="border-b">
                <td className="p-3">{camp.campName}</td>
                <td className="p-3">{camp.dateTime.slice(0, 10)}</td>
                <td className="p-3">{camp.location}</td>
                <td className="p-3">{camp.professionalName}</td>
                <td className="p-3">{camp.participantCount}</td>
                <td className="p-3 flex items-center">
                  <Link
                    to={`/update-camp/${camp.id}`}
                    className="text-primary hover:text-accent mr-4"
                  >
                    Edit
                  </Link>
                  |
                  <button
                    onClick={() => handleDelete(camp.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Delete
                  </button>
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

export default ManageCamps;
