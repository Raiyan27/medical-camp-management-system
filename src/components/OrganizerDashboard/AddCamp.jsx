import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddCamp = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const campData = {
        campName: data.campName,
        image: data.image,
        fees: data.fees,
        dateTime: data.dateTime,
        location: data.location,
        professionalName: data.professionalName,
        participantCount: data.participantCount,
        description: data.description,
      };

      const response = await axiosSecure.post("/camps", campData);

      if (response.status === 200) {
        toast("Camp added successfully!");
      } else {
        toast(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error saving camp:", error);
      toast("There was an error adding the camp.");
    }
  };

  return (
    <div className="border p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add A Camp</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="campName"
          >
            Camp Name
          </label>
          <input
            type="text"
            id="campName"
            placeholder="Camp Name"
            {...register("campName", { required: "Camp name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm">{errors.campName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            placeholder="Image URL"
            {...register("image", { required: "Camp image URL is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="fees">
            Camp Fees
          </label>
          <input
            type="number"
            id="fees"
            placeholder="Camp Fees"
            {...register("fees", {
              required: "Camp fees is required",
              min: {
                value: 0,
                message: "Fees must be greater than or equal to 0",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm">{errors.fees.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="dateTime"
          >
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            {...register("dateTime", {
              required: "Date and time are required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm">{errors.dateTime.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            {...register("location", { required: "Camp location is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="professionalName"
          >
            Healthcare Professional Name
          </label>
          <input
            type="text"
            id="professionalName"
            placeholder="Healthcare Professional Name"
            {...register("professionalName", {
              required: "Healthcare professional name is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.professionalName && (
            <p className="text-red-500 text-sm">
              {errors.professionalName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="participantCount"
          >
            Participant Count
          </label>
          <input
            type="number"
            id="participantCount"
            placeholder="Participant Count"
            {...register("participantCount", {
              required: "Participant count is required",
              min: { value: 0, message: "Count cannot be less than 0" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.participantCount && (
            <p className="text-red-500 text-sm">
              {errors.participantCount.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            {...register("description", {
              required: "Camp description is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-accent text-white px-6 py-2 rounded"
        >
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
