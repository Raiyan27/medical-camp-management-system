import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { Spinner } from "@material-tailwind/react";
import Search from "../Search";

const fetchPaymentHistory = async (email, axiosSecure) => {
  const response = await axiosSecure.get(`/payments/${email}`);
  return response.data.payments;
};

const PaymentHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser.email;
  const axiosSecure = useAxiosSecure();

  const { data, status, error } = useQuery({
    queryKey: ["paymentHistory", email],
    queryFn: () => fetchPaymentHistory(email, axiosSecure),
    enabled: !!email,
  });

  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  useEffect(() => {
    if (data) {
      setFilteredPayments(data);
    }
  }, [data]);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    const filteredData = data.filter(
      (payment) =>
        payment.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paidBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(filteredData);
  };

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;

  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );

  if (!data || filteredPayments.length === 0) {
    return (
      <div className="border p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Payment History</h3>
        <Search onSearch={handleSearch} />
        <p className="text-center text-xl text-gray-600 mt-6">
          {searchQuery ? "No matching data" : "You have no payment records."}
        </p>
      </div>
    );
  }

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Payment History</h3>
      <Search onSearch={handleSearch} />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Camp Name</th>
              <th className="p-3 text-left">Amount Paid</th>
              <th className="p-3 text-left">Paid By</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => (
              <tr key={payment._id} className="border-b">
                <td className="p-3">{payment.campName}</td>
                <td className="p-3">${payment.amountPaid}</td>
                <td className="p-3">{payment.paidBy}</td>
                <td className="p-3">
                  {new Date(payment.date).toLocaleString()}
                </td>
                <td className="p-3">{payment.transactionId}</td>
              </tr>
            ))}
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
              className={`p-1 py-2 mx-1 rounded-lg ${
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
    </div>
  );
};

export default PaymentHistory;
