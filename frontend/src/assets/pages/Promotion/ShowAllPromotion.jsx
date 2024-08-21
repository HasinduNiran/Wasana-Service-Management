import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowAllPromotion = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:8077/Promotion");
        setPromotions(response.data);
      } catch (error) {
        console.error("There was an error fetching the promotions!", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await axios.delete(`http://localhost:8077/Promotion/${id}`);
        setPromotions(promotions.filter((promotion) => promotion._id !== id));
        alert("Promotion deleted successfully!");
      } catch (error) {
        console.error("There was an error deleting the promotion!", error);
        alert("Failed to delete promotion. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>All Promotions</h2>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href = '/Promotion/Create'}>
                    Add Promotion
                </button>
      {promotions.length === 0 ? (
        <p>No promotions available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Discount (%)</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion._id}>
                <td>{promotion.title}</td>
                <td>{promotion.description}</td>
                <td>{promotion.discount}</td>
                <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
                <td>{new Date(promotion.endDate).toLocaleDateString()}</td>
                <td>
                  <Link to={`/Promotion/edit/${promotion._id}`}>Edit</Link>
                  {" | "}
                  <Link to={`/Promotion/${promotion._id}`}>Readone</Link>
                  {" | "}
                  <button onClick={() => handleDelete(promotion._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllPromotion;
