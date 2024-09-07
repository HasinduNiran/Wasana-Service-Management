import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import debounce from "lodash.debounce"; // Optional for debouncing search

const ShowAllPromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:8077/Promotion");
        setPromotions(response.data);
        setFilteredPromotions(response.data);
      } catch (error) {
        setError("Failed to fetch promotions.");
        console.error("Error fetching promotions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  // Debounce search input to avoid excessive filtering on every keystroke
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    const filtered = promotions.filter(
      (promo) =>
        new Date(promo.endDate) >= new Date() &&
        (promo.title.toLowerCase().includes(query.toLowerCase()) ||
          promo.description.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredPromotions(filtered);
  }, 300);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await axios.delete(`http://localhost:8077/Promotion/${id}`);
        setPromotions(promotions.filter((promotion) => promotion._id !== id));
        alert("Promotion deleted successfully!");
      } catch (error) {
        console.error("Error deleting promotion", error);
        alert("Failed to delete promotion. Please try again.");
      }
    }
  };

  // Generate PDF report for promotions
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Promotion Report", 14, 16);

    doc.autoTable({
      startY: 22,
      head: [["Title", "Description", "Discount (%)", "Start Date", "End Date"]],
      body: filteredPromotions.map((promotion) => [
        promotion.title,
        promotion.description,
        promotion.discount,
        new Date(promotion.startDate).toLocaleDateString(),
        new Date(promotion.endDate).toLocaleDateString(),
      ]),
    });

    doc.save("promotion-report.pdf");
  };

  if (loading) return <p>Loading promotions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <style>{`
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
        th, td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
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
        input[type="text"] {
          padding: 10px;
          width: 100%;
          margin-bottom: 20px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      `}</style>
      
      <h2>All Promotions</h2>
      
      <div className="flex justify-between items-center mb-4">
        <Link to="/Promotion/Create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Promotion
        </Link>
        <button onClick={generateReport} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Generate Report
        </button>
      </div>
      
      <input
        type="text"
        placeholder="Search by title or description..."
        onChange={(e) => handleSearch(e.target.value)}
        className="p-2 border rounded"
      />

      {filteredPromotions.length === 0 ? (
        <p>No promotions available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Discount (%)</th>
              <th>Price</th>             
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promotion) => (
              <tr key={promotion._id}>
                <td>{promotion.title}</td>
                <td>{promotion.description}</td>
                <td>{promotion.Percentage}</td>
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
