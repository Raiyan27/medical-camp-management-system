import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentModal = ({
  open,
  onClose,
  camp,
  amount,
  email,
  onPaymentSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  if (!open) return null;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setLoading(false);
      Swal.fire({
        title: "Payment Failed",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      const { data } = await axiosSecure.post("/payment", {
        token: paymentMethod,
        campId: camp.campId,
        amount,
        paidBy: email,
        campName: camp.campName,
        email,
        regId: camp._id,
      });
      console.log();
      if (data) {
        Swal.fire({
          title: "Payment Successful",
          text: "Your payment has been processed successfully!",
          icon: "success",
          confirmButtonText: "Okay",
        });
        onPaymentSuccess(camp._id);
        onClose();
      }
    } catch (error) {
      Swal.fire({
        title: "Payment Error",
        text: "There was an error processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Complete Your Payment
        </h2>
        <h1>For {camp.campName}</h1>
        <h1>Payment Amount: {camp.fees}</h1>
        <form onSubmit={handlePayment} className="space-y-4">
          <div className="form-field">
            <CardElement className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6 mx-auto"></div>
              ) : (
                "Pay Now"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
