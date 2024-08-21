import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

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
    <div className="container">
    <style>{`
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }

              .container {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 20px;
              }

              h2 {
                  color: #333;
                  text-align: center;
              }

              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }

              table, th, td {
                  border: 1px solid #ddd;
              }

              th, td {
                  padding: 12px;
                  text-align: left;
              }

              th {
                  background-color: #f2f2f2;
                  font-weight: bold;
              }

              tr:nth-child(even) {
                  background-color: #f9f9f9;
              }

              button {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px 20px;
                  margin: 10px 0;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  transition: background-color 0.3s ease;
              }

              button:hover {
                  background-color: #45a049;
              }

              .text-center {
                  text-align: center;
              }

              .flex {
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }

              .gap-x-4 {
                  gap: 16px;
              }

              @media screen and (max-width: 768px) {
                  table {
                      font-size: 14px;
                  }

                  th, td {
                      padding: 8px;
                  }

                  button {
                      padding: 8px 16px;
                  }
              }
          `}</style>
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
                <div className="flex gap-x-4">
                <Link to={`/Promotion/${promotion._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/Promotion/edit/${promotion._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <button onClick={() => handleDelete(promotion._id)}>
                                                <MdOutlineDelete className="text-2xl text-red-600" />
                                            </button>
                                            </div>
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
