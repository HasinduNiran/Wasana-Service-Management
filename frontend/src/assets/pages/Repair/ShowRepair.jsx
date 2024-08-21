import React, { useState, useEffect } from "react"; // Import useState and useEffect
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const ShowRepair = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8077/Repair")
      .then((response) => {
        console.log("API Response:", response.data); // Log the response to check its structure
        const data = response.data;
        if (Array.isArray(data)) {
          setRepairs(data);
        } else {
          console.warn("Data is not an array:", data);
          setRepairs([]); // Fallback to an empty array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee salaries:", error);
        setRepairs([]); // Fallback to an empty array on error
        setLoading(false);
      });
  }, []);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Repair list</h1>

        <div className="flex justify-center items-center mt-10">
          <button
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = "/Repair/create")}
          >
            Add
          </button>
        </div>
      </div>

      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Made</th>
            <th className="border px-4 py-2 text-left">Model</th>
            <th className="border px-4 py-2 text-left">Vehicle No</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Insurance Provider</th>
            <th className="border px-4 py-2 text-left">Agent</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9">Loading...</td>
            </tr>
          ) : repairs.length > 0 ? (
            repairs.map((Repair) => (
              <tr key={Repair._id}>
                <td className="border px-4 py-2 text-left">
                  {Repair.customerName}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.customerEmail}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.customerPhone}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.vehicleMake}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.vehicleModel}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.vehicleNo}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.repairDescription}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.repairStatus}
                </td>
                <td className="border px-4 py-2 text-left">
                  {Repair.Insuranceprovider}
                </td>
                <td className="border px-4 py-2 text-left">{Repair.Agent}</td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/Repair/${Repair._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/Repair/edit/${Repair._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <Link to={`/Repair/delete/${Repair._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No Repairs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRepair;
