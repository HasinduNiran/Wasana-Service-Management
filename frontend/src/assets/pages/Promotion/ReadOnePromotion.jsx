import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReadOnePromotion = () => {
  const { id } = useParams(); // Get the promotion ID from the URL
  const [promotion, setPromotion] = useState(null);

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

  if (!promotion) {
    return <p className="text-center text-gray-500">Loading promotion details...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Promotion Details</h2>
      <div className="space-y-4">
        <p className="text-lg"><strong className="font-medium text-gray-700">Title:</strong> {promotion.title}</p>
        <p className="text-lg"><strong className="font-medium text-gray-700">Description:</strong> {promotion.description}</p>
        <p className="text-lg"><strong className="font-medium text-gray-700">Discount:</strong> {promotion.discount}%</p>
        <p className="text-lg"><strong className="font-medium text-gray-700">Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
        <p className="text-lg"><strong className="font-medium text-gray-700">End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ReadOnePromotion;
