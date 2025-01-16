import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const fetchCamp = async (axiosPublic, campId) => {
  try {
    const response = await axiosPublic.get(`/camps/${campId}`);
    if (response) {
      return response.data.data.camp;
    }
    throw new Error("Camp not found");
  } catch (error) {
    console.error("Error fetching camp:", error);
    throw new Error("Failed to fetch camp");
  }
};

const EditCampModal = ({ camp, onClose, refetch, setFilteredCamps }) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, status, error } = useQuery({
    queryKey: ["camp", camp],
    queryFn: () => fetchCamp(axiosPublic, camp._id),
    enabled: !!camp,
  });

  useEffect(() => {
    if (data) {
      setValue("campName", data.campName);
      setValue("dateTime", data.dateTime);
      setValue("location", data.location);
      setValue("professionalName", data.professionalName);
      setValue("description", data.description);
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    axiosSecure
      .put(`/update-camp/${camp._id}`, formData)
      .then(() => {
        const updatedCamp = { ...camp, ...formData };
        setFilteredCamps((prevCamps) =>
          prevCamps.map((item) =>
            item._id === updatedCamp._id ? updatedCamp : item
          )
        );

        Swal.fire({
          title: "Updated!",
          text: "The camp details have been updated successfully.",
          icon: "success",
        });
        onClose();
        refetch();
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the camp details.",
          icon: "error",
        });
        console.error("Error updating camp details", err);
      });
  };

  if (status === "loading") return <p>Loading camp details...</p>;
  if (status === "error")
    return <p>Error fetching camp details: {error.message}</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 lg:w-2/4">
        <h3 className="text-xl font-semibold mb-4">Edit Camp Details</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2">Camp Name</label>
            <input
              type="text"
              name="campName"
              {...register("campName", { required: "Camp name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.campName && (
              <p className="text-red-500">{errors.campName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="datetime-local"
              name="dateTime"
              {...register("dateTime", {
                required: "Date and time are required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.dateTime && (
              <p className="text-red-500">{errors.dateTime.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              {...register("location", { required: "Location is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Healthcare Professional</label>
            <input
              type="text"
              name="professionalName"
              {...register("professionalName", {
                required: "Healthcare professional name is required",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.professionalName && (
              <p className="text-red-500">{errors.professionalName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Camp Description</label>
            <textarea
              name="description"
              {...register("description", {
                required: "Camp description is required",
              })}
              className="w-full p-2 border rounded"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCampModal;
