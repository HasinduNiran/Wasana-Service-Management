import React, { useState } from "react";
import axios from "axios";

const CreatePromotion = () => {
  const [promotion, setPromotion] = useState({
    title: "",
    description: "",
    discount: 0,
    startDate: "",
    endDate: ""
  });

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
      await axios.post('http://localhost:8077/Promotion', promotion);
      alert("Promotion created successfully!");
      setPromotion({
        title: "",
        description: "",
        discount: 0,
        startDate: "",
        endDate: ""
      });
    } catch (error) {
      console.error("There was an error creating the promotion!", error);
      alert("Failed to create promotion. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Promotion</h2>
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
            value={promotion.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={promotion.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Promotion</button>
      </form>
    </div>
  );
};

export default CreatePromotion;
