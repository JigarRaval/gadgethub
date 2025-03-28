import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const AddProducts = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const selectedState = watch("stateId");
  const selectedCity = watch("cityId");

  // ✅ Fetch all states on mount
  useEffect(() => {
    axios
      .get("/state/getallstate")
      .then((res) => setStates(res.data.data || []))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  // ✅ Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      axios
        .get(`/city/getcitybystate/${selectedState}`)
        .then((res) => setCities(res.data.data || []))
        .catch((err) => console.error("Error fetching cities:", err));
    } else {
      setCities([]);
    }
    setAreas([]); // Reset areas when state changes
  }, [selectedState]);

  // ✅ Fetch areas when city changes
  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`/area/getallareabycity/${selectedCity}`)
        .then((res) => setAreas(res.data.data || []))
        .catch((err) => console.error("Error fetching areas:", err));
    } else {
      setAreas([]);
    }
  }, [selectedCity]);

  // ✅ Handle form submission
  const submitHandler = async (data) => {
    try {
      data.userId = localStorage.getItem("id"); // Attach user ID
      await axios.post("/products/addProduct", data);
      console.log(data)
      alert("Product added successfully!");
    } catch (error) {`  `
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Add Product
        </h1>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          
          {/* Product Name */}
          <InputField
            label="Product Name"
            type="text"
            register={register("name", { required: "Product Name is required" })}
            error={errors.name}
          />

          {/* Product Description */}
          <InputField
            label="Product Description"
            type="text"
            register={register("description")}
          />

          {/* Price & Offered Price */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Price"
              type="number"
              register={register("price", { required: "Price is required" })}
              error={errors.price}
            />
            <InputField
              label="Offered Price"
              type="number"
              register={register("offeredPrice")}
            />
          </div>

          {/* Stock */}
          <InputField
            label="Stock"
            type="number"
            register={register("stock", { required: "Stock is required" })}
            error={errors.stock}
          />

          {/* Image URL */}
          <InputField
            label="Image URL"
            type="text"
            register={register("image", { required: "Image URL is required" })}
            error={errors.image_url}
          />

          {/* State Dropdown */}
          <SelectField
            label="State"
            register={register("stateId", { required: "State is required" })}
            options={states}
            error={errors.stateId}
          />

          {/* City Dropdown */}
          <SelectField
            label=" City"
            register={register("cityId", { required: "City is required" })}
            options={cities}
            disabled={!selectedState}
            error={errors.cityId}
          />

          {/* Area Dropdown */}
          <SelectField
            label=" Area"
            register={register("areaId", { required: "Area is required" })}
            options={areas}
            disabled={!selectedCity}
            error={errors.areaId}
          />

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable Input Field Component
const InputField = ({ label, type, register, error }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      {...register}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

// ✅ Reusable Select Field Component
const SelectField = ({ label, register, options, disabled, error }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <select
      {...register}
      disabled={disabled}
      className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
        disabled ? "bg-gray-200 cursor-not-allowed" : "focus:ring-blue-400"
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name || item.cityName || item.areaName}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);