import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../Auth/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const AddCamp = () => {
  const axiosSecure = useAxiosSecure();
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const email = currentUser.email;

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_IMAGE_API_KEY;

  const onDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast("Image uploaded successfully!");
      } else {
        toast("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast("There was an error uploading the image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const onSubmit = async (data) => {
    try {
      const campData = {
        campName: data.campName,
        image: imageUrl,
        fees: data.fees,
        dateTime: data.dateTime,
        location: data.location,
        professionalName: data.professionalName,
        participantCount: data.participantCount,
        description: data.description,
        createdBy: email,
      };

      const response = await axiosSecure.post("/camps", campData);

      if (response.status === 200) {
        toast("Camp added successfully!");
        reset();
        setImageUrl("");
        queryClient.invalidateQueries(["camps"]);
      } else {
        toast(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error saving camp:", error);
      toast("There was an error adding the camp.");
    }
  };

  return (
    <div className="border p-6 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add A Camp</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className="w-full p-3 border rounded-md"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm">{errors.campName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="image">
            Image (Drag and Drop)
          </label>
          <div
            {...getRootProps()}
            className="border p-6 border-dashed rounded-md cursor-pointer text-center"
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              Drag and drop an image here, or click to select one
            </p>
          </div>
          {imageUrl && (
            <div className="mt-2 text-center">
              <p className="text-green-500">Image uploaded successfully!</p>
              <img
                src={imageUrl}
                alt="Uploaded Preview"
                className="mt-2 max-w-[200px] mx-auto rounded"
              />
            </div>
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
            className="w-full p-3 border rounded-md"
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
            className="w-full p-3 border rounded-md"
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
            className="w-full p-3 border rounded-md"
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
            className="w-full p-3 border rounded-md"
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
            className="w-full p-3 border rounded-md"
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
            className="w-full p-3 border rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-accent text-white px-6 py-3 rounded-md"
        >
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
