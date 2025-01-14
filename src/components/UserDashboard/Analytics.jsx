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
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fetchAnalyticsData = async (participantId, axiosPublic) => {
  const response = await axiosPublic.get(
    `/participants/${participantId}/analytics`
  );
  return response.data;
};

const Analytics = () => {
  const participantId = "current-participant-id";
  const axiosPublic = useAxiosPublic();

  const { data, status } = useQuery({
    queryKey: ["analyticsData", participantId],
    queryFn: () => fetchAnalyticsData(participantId, axiosPublic),
    enabled: !!participantId,
  });

  if (status === "loading") return <p>Loading analytics...</p>;
  if (status === "error") return <p>An error occurred</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Camp Analytics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="campName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="fees" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
