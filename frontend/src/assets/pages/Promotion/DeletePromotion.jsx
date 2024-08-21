import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeletePromotion = () => {
  const { id } = useParams(); // Get the promotion ID from the URL
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(`http://localhost:8077/Promotion/${id}`);
        setPromotion(response.data);
      } catch (error) {
        console.error("There was an error fetching the promotion!", error);
        setError("Failed to load promotion details. Please try again later.");
      }
    };

    fetchPromotion();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await axios.delete(`http://localhost:8077/Promotion/${id}`);
        alert("Promotion deleted successfully!");
        navigate("/promotions"); // Redirect to the promotions list after deletion
      } catch (error) {
        console.error("There was an error deleting the promotion!", error);
        alert("Failed to delete promotion. Please try again.");
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!promotion) {
    return <p>Loading promotion details...</p>;
  }

  return (
    <div>
      <h2>Delete Promotion</h2>
      <p><strong>Title:</strong> {promotion.title}</p>
      <p><strong>Description:</strong> {promotion.description}</p>
      <p><strong>Discount:</strong> {promotion.discount}%</p>
      <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete Promotion</button>
    </div>
  );
};

export default DeletePromotion;
