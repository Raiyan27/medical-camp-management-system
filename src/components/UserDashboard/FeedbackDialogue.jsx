import React, { useEffect, useState } from "react";
import { MdDoneOutline } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export function FeedbackDialog({ open, handleClose, camp, onFeedbackSubmit }) {
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [username] = useState(camp.userName);
  const [email] = useState(camp.userEmail);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setValue("rating", newRating);
  };

  useEffect(() => {
    if (open) {
      setSuccessMessage("");
      setError("");
      setRating(0);
      reset({ rating: 0, review: "" });
    }
  }, [open, reset]);

  const onSubmit = async (data) => {
    if (rating === 0 || data.review.trim() === "") {
      setError("Please provide both a rating and a review.");
      return;
    }

    const feedbackData = {
      rating,
      reviewName: username,
      reviewerEmail: email,
      campId: camp._id,
      campName: camp.campName,
      review: data.review,
    };

    try {
      const response = await axiosPublic.post("/submit-feedback", feedbackData);

      if (response.status === 200) {
        setSuccessMessage("Feedback submitted successfully.");
        setError("");

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your feedback has been submitted successfully!",
          confirmButtonText: "OK",
        });
        onFeedbackSubmit(camp._id, rating, data.review);
      } else {
        setError(
          response.data.message ||
            "An error occurred while submitting feedback."
        );
        setSuccessMessage("");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            response.data.message ||
            "An error occurred while submitting feedback.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while submitting feedback."
      );
      setSuccessMessage("");

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "An error occurred while submitting feedback.",
        confirmButtonText: "OK",
      });
    }
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        open ? "block" : "hidden"
      } bg-gray-500 bg-opacity-50`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Leave Feedback</h3>
            <button
              onClick={handleClose}
              className="text-gray-500"
              aria-label="Close Feedback Dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="mb-4 text-red-600 text-sm">
                <p>{error}</p>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 text-green-600 text-sm">
                <p>{successMessage}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                readOnly
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                {...register("username")}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                {...register("email")}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-600"
              >
                Rating (1-5)
              </label>
              <div className="flex mt-2">
                <ReactStars
                  count={5}
                  onChange={handleRatingChange}
                  value={rating}
                  size={30}
                  activeColor="#ffd700"
                  isHalf={false}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-600"
              >
                Review
              </label>
              <textarea
                id="review"
                rows="4"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                {...register("review", { required: "Review is required" })}
              />
              {errors.review && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.review.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
