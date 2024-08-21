import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPromotion = () => {
  const { id } = useParams(); // Get the promotion ID from the URL
  const navigate = useNavigate();
  
  const [promotion, setPromotion] = useState({
    title: "",
    description: "",
    discount: 0,
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/Promotion/${id}`);
        setPromotion(response.data);
      } catch (error) {
        console.error("There was an error fetching the promotion!", error);
      }
    };

    fetchPromotion();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8077/Promotion/${id}`, promotion);
      alert("Promotion updated successfully!");
      navigate(`/Promotion`); // Redirect to the promotions list or another relevant page
    } catch (error) {
      console.error("There was an error updating the promotion!", error);
      alert("Failed to update promotion. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">Edit Promotion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={promotion.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={promotion.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            rows="4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={promotion.discount}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={promotion.startDate.split("T")[0]} // Format date for input
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={promotion.endDate.split("T")[0]} // Format date for input
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 font-bold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Promotion
        </button>
      </form>
    </div>
  );
};

export default EditPromotion;
