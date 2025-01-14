import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const fetchRegisteredCamps = async (participantId, axiosPublic) => {
  const response = await axiosPublic.get(
    `/participants/${participantId}/camps`
  );
  return response.data;
};

const RegisteredCamps = () => {
  const participantId = "current-participant-id";
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data, status } = useQuery({
    queryKey: ["registeredCamps", participantId],
    queryFn: () => fetchRegisteredCamps(participantId, axiosPublic),
    enabled: !!participantId,
  });

  const handlePayment = (campId) => {
    navigate(`/payment/${campId}`);
  };

  const handleCancel = (campId) => {};

  if (status === "loading") return <p>Loading camps...</p>;
  if (status === "error") return <p>An error occurred</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Registered Camps</h3>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Camp Name</th>
            <th className="border-b p-2">Fees</th>
            <th className="border-b p-2">Payment Status</th>
            <th className="border-b p-2">Confirm Status</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((camp) => (
            <tr key={camp.id}>
              <td className="border-b p-2">{camp.name}</td>
              <td className="border-b p-2">${camp.fees}</td>
              <td className="border-b p-2">{camp.paymentStatus}</td>
              <td className="border-b p-2">{camp.confirmStatus}</td>
              <td className="border-b p-2">
                {camp.paymentStatus === "unpaid" && (
                  <button
                    onClick={() => handlePayment(camp.id)}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Pay
                  </button>
                )}
                {camp.paymentStatus === "paid" && (
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Paid
                  </button>
                )}
                <button
                  onClick={() => handleCancel(camp.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredCamps;
