import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";

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

  if (status === "loading") return <p>Loading payment history...</p>;

  if (!data || data.length === 0) {
    return (
      <div className="border p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Payment History</h3>
        <p className="text-center text-xl text-gray-600 mt-6">
          You have no payment records.
        </p>
      </div>
    );
  }

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow">
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
            {data.map((payment) => (
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
    </div>
  );
};

export default PaymentHistory;
