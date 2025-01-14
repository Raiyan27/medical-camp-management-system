import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Select from "react-select";

const EditUserProfileModal = ({
  currentUser,
  data,
  onClose,
  onProfileUpdated,
}) => {
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    age: data?.age || "",
    phoneNumber: data?.phoneNumber || "",
    gender: data?.gender || "",
    emergencyContact: data?.emergencyContact || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData((prevData) => ({ ...prevData, gender: selectedOption.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
      isValid = false;
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!formData.emergencyContact) {
      newErrors.emergencyContact = "Emergency contact is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosPublic.put("/user", formData);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        onProfileUpdated();
        onClose();
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-lg mx-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6">Edit Profile</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Gender</label>
            <Select
              name="gender"
              value={genderOptions.find(
                (option) => option.value === formData.gender
              )}
              onChange={handleGenderChange}
              options={genderOptions}
            />
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.emergencyContact && (
              <p className="text-red-500 text-xs">{errors.emergencyContact}</p>
            )}
          </div>

          <button
            onClick={handleSaveChanges}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>

          <button
            onClick={onClose}
            className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfileModal;
