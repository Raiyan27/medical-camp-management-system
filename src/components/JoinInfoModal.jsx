import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const JoinInfoModal = ({ isOpen, onClose, camp, user, onSubmit }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = async (data) => {
    const { age, phoneNumber, gender, emergencyContact } = data;

    try {
      axiosSecure
        .post("/register-to-camp", {
          campId: camp._id,
          userName: user.displayName,
          userEmail: user.email,
          campName: camp.campName,
          fees: camp.fees,
          campLocation: camp.location,
          professionalName: camp.professionalName,
          age,
          phoneNumber,
          gender,
          emergencyContact,
        })
        .then((response) => {
          if (response.status === 208) {
            Swal.fire({
              title: "Already Registered",
              text: "You are already registered for this camp.",
              icon: "info",
              confirmButtonText: "Okay",
            });
          } else if (response.status === 200) {
            Swal.fire({
              title: "Registered Successfully",
              text: "You are now registered for the camp!",
              icon: "success",
              confirmButtonText: "Okay",
            });
            navigate(`/user-dashboard/registered-camps`);
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Registration Failed",
            text: "There was an error registering for the camp. Please try again.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        });

      onSubmit();
      onClose();
      reset();
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: "There was an error registering. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-8 w-full max-h-screen overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4">Join Camp</h2>
          <div className="max-h-[80vh] overflow-y-auto">
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold">Camp Name</label>
                <input
                  type="text"
                  value={camp.campName}
                  readOnly
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Camp Fees</label>
                <input
                  type="text"
                  value={`$${camp.fees}`}
                  readOnly
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Location</label>
                <input
                  type="text"
                  value={camp.location}
                  readOnly
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Healthcare Professional
                </label>
                <input
                  type="text"
                  value={camp.professionalName}
                  readOnly
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Participant Name
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Participant Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Age</label>
                <input
                  type="number"
                  {...register("age", { required: "Age is required" })}
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: "Phone number must be between 7 to 15 digits",
                    },
                  })}
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Gender</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  {...register("emergencyContact", {
                    required: "Emergency contact is required",
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: "Phone number must be between 7 to 15 digits",
                    },
                  })}
                  className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between sm:col-span-2">
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinInfoModal;
