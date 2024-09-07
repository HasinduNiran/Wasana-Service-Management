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
    <div className="container">
        <style>{`
            .container {
                max-width: 600px;
                position: center;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            
            .store-field {
                margin-bottom: 10px;
            }
            
            .label {
                font-weight: bold;
                margin-right: 10px;
            }
            
            .value {
                font-size: 16px;
                color: #555;
            }
        `}</style>
      <h2>Promotion Details</h2>
      <p><strong>Title:</strong> {promotion.title}</p>
      <p><strong>Description:</strong> {promotion.description}</p>
      <p><strong>Percentage:</strong> {promotion.Percentage}%</p>
      <p><strong>Discount Price:</strong> Rs {promotion.discount}.00</p>
      <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default ReadOnePromotion;
