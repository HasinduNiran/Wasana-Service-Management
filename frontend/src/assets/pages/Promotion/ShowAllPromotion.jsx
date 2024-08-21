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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Promotions</h2>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => (window.location.href = "/Promotion/Create")}
      >
        Add Promotion
      </button>

      {promotions.length === 0 ? (
        <p className="text-gray-500">No promotions available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Discount (%)</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion._id} className="text-center">
                <td className="py-2 px-4 border-b">{promotion.title}</td>
                <td className="py-2 px-4 border-b">{promotion.description}</td>
                <td className="py-2 px-4 border-b">{promotion.discount}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(promotion.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(promotion.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/Promotion/edit/${promotion._id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </Link>
                  |
                  <Link
                    to={`/Promotion/${promotion._id}`}
                    className="text-blue-500 hover:text-blue-700 ml-2 mr-2"
                  >
                    Readone
                  </Link>
                  |
                  <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => handleDelete(promotion._id)}
                  >
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
