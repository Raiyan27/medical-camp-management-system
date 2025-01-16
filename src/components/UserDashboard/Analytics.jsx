import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { Spinner } from "@material-tailwind/react";

const fetchPaymentsData = async (email, axiosSecure) => {
  const response = await axiosSecure.get(`/payments/${email}`);
  return response.data.payments;
};

const PaymentAnalytics = () => {
  const { currentUser } = useContext(AuthContext);
  const email = currentUser?.email;
  const axiosSecure = useAxiosSecure();

  const { data, status } = useQuery({
    queryKey: ["paymentAnalyticsData", email],
    queryFn: () => fetchPaymentsData(email, axiosSecure),
    enabled: !!email,
  });

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );

  if (!data || data.length === 0) {
    return (
      <h1 className="text-red-400 text-xl">
        No payment data available for this user.
      </h1>
    );
  }

  const totalAmountPaid = data.reduce(
    (total, payment) => total + (parseFloat(payment.amountPaid) || 0),
    0
  );

  const numberOfPayments = data.length;

  const chartData = data.map((payment) => ({
    campName: payment.campName,
    fees: payment.amountPaid,
    date: new Date(payment.date).toLocaleDateString(),
  }));

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Payment Analytics</h3>

      <p className="mb-4">
        This chart visualizes the payments made by the user over time for
        different camps. The X-axis represents the date of the payment, while
        the Y-axis shows the amount paid for each camp. Each data point
        represents a payment for a particular camp.
      </p>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow-md rounded-lg text-center">
          <h4 className="text-lg font-semibold text-gray-800">
            Total Amount Paid
          </h4>
          <p className="text-2xl font-bold text-blue-600">
            ${totalAmountPaid.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg text-center">
          <h4 className="text-lg font-semibold text-gray-800">
            Number of Payments
          </h4>
          <p className="text-2xl font-bold text-green-600">
            {numberOfPayments}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fees" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentAnalytics;
