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
    return <p>No payment data available for this user.</p>;
  }

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

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="fees" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentAnalytics;
