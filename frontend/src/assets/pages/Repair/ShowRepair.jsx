import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowRepair = () => {
  const [repairs, setRepairs] = useState([]);
  const [filteredRepairs, setFilteredRepairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8077/Repair")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setRepairs(data);
          setFilteredRepairs(data); // Set filtered repairs initially
        } else {
          setRepairs([]);
          setFilteredRepairs([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repairs:", error);
        setRepairs([]);
        setFilteredRepairs([]);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = repairs.filter((repair) =>
      repair.customerName.toLowerCase().includes(query) ||
      repair.customerEmail.toLowerCase().includes(query) ||
      repair.vehicleMake.toLowerCase().includes(query) ||
      repair.vehicleModel.toLowerCase().includes(query) ||
      repair.vehicleNo.toLowerCase().includes(query) ||
      repair.repairStatus.toLowerCase().includes(query) ||
      repair.Insuranceprovider?.toLowerCase().includes(query) ||
      repair.Agent?.toLowerCase().includes(query)
    );
    setFilteredRepairs(filtered);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Repair Report', 14, 16);
    
    const tableData = filteredRepairs.map(repair => [
      repair.customerName,
      repair.customerEmail,
      repair.customerPhone,
      repair.vehicleMake,
      repair.vehicleModel,
      repair.vehicleNo,
      repair.repairDescription,
      repair.repairStatus,
      repair.Insuranceprovider,
      repair.Agent
    ]);

    doc.autoTable({
      head: [['Customer Name', 'Email', 'Phone', 'Make', 'Model', 'Vehicle No', 'Description', 'Status', 'Insurance Provider', 'Agent']],
      body: tableData,
      startY: 30,
      margin: { horizontal: 10 },
      styles: { fontSize: 10 },
    });

    doc.save('repair_report.pdf');
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl my-8">Repair List</h1>
        <input
          type="text"
          placeholder="Search repair..."
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateReport}
        >
          Generate Report
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/Repair/create")}
        >
          Add
        </button>
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
              <td colSpan="11">Loading...</td>
            </tr>
          ) : filteredRepairs.length > 0 ? (
            filteredRepairs.map((repair) => (
              <tr key={repair._id}>
                <td className="border px-4 py-2 text-left">
                  {repair.customerName}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.customerEmail}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.customerPhone}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.vehicleMake}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.vehicleModel}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.vehicleNo}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.repairDescription}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.repairStatus}
                </td>
                <td className="border px-4 py-2 text-left">
                  {repair.Insuranceprovider}
                </td>
                <td className="border px-4 py-2 text-left">{repair.Agent}</td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/Repair/${repair._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/Repair/edit/${repair._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <Link to={`/Repair/delete/${repair._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No Repairs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRepair;
