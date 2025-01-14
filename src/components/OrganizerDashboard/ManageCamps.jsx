import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";

const ManageCamps = () => {
  const [camps, setCamps] = useState([
    {
      id: 1,
      name: "Health Awareness Camp",
      date: "2025-02-15",
      location: "Community Hall A",
      professional: "Dr. Alice Smith",
      participantCount: 45,
    },
    {
      id: 2,
      name: "Free Eye Checkup",
      date: "2025-03-10",
      location: "City Clinic B",
      professional: "Dr. Bob Johnson",
      participantCount: 60,
    },
  ]);

  const [filteredCamps, setFilteredCamps] = useState(camps);
  const [currentPage, setCurrentPage] = useState(1);
  const [campsPerPage] = useState(10);

  const handleSearch = (searchTerm) => {
    const filteredData = camps.filter(
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
      const updatedCamps = camps.filter((camp) => camp.id !== id);
      setCamps(updatedCamps);
      setFilteredCamps(updatedCamps);
    }
  };

  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = filteredCamps.slice(indexOfFirstCamp, indexOfLastCamp);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCamps.length / campsPerPage);

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Camps</h2>

      <Search onSearch={handleSearch} />

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Camp Name</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Healthcare Professional</th>
              <th className="p-3 text-left">Participants</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCamps.map((camp) => (
              <tr key={camp.id} className="border-b">
                <td className="p-3">{camp.name}</td>
                <td className="p-3">{camp.date}</td>
                <td className="p-3">{camp.location}</td>
                <td className="p-3">{camp.professional}</td>
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
