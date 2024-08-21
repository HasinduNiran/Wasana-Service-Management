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
    <div>
      <h2>Edit Promotion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={promotion.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={promotion.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={promotion.discount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={promotion.startDate.split("T")[0]} // Format date for input
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={promotion.endDate.split("T")[0]} // Format date for input
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Promotion</button>
      </form>
    </div>
  );
};

export default EditPromotion;
