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
    return <p>Loading promotion details...</p>;
  }

  return (
    <div>
      <h2>Promotion Details</h2>
      <p><strong>Title:</strong> {promotion.title}</p>
      <p><strong>Description:</strong> {promotion.description}</p>
      <p><strong>Discount:</strong> {promotion.discount}%</p>
      <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default ReadOnePromotion;
