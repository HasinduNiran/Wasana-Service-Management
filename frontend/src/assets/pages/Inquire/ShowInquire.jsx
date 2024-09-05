import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowInquire = () => {
    const [inquire, setInquire] = useState([]);
    const [filteredInquire, setFilteredInquire] = useState([]); // Add state for filtered inquiries
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

    useEffect(() => {
      setLoading(true);
      axios
          .get('http://localhost:8077/Inquire')
          .then((response) => {
              setInquire(response.data.data);
              setFilteredInquire(response.data.data); // Initialize filtered inquiries
              setLoading(false);
          })
          .catch((error) => {
              console.log(error);
              setLoading(false);
          });
  }, []);

    // Search handler function
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = inquire.filter((inq) => {
            return (
                inq.Name.toLowerCase().includes(query) ||
                inq.Number.toLowerCase().includes(query) ||
                inq.Email.toLowerCase().includes(query) ||
                inq.ServiceType.toLowerCase().includes(query) ||
                inq.VehicleNumber.toLowerCase().includes(query) ||
                inq.Message.toLowerCase().includes(query)
            );
        });
        setFilteredInquire(filtered);
    };

    // Generate PDF report function
    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Inquire Report', 14, 16);

        const tableData = filteredInquire.map(inq => [
            inq.Name,
            inq.Number,
            inq.Email,
            inq.ServiceType,
            inq.VehicleNumber,
            inq.Message
        ]);

        doc.autoTable({
            head: [['Name', 'Number', 'Email', 'Service Type', 'Vehicle Number', 'Message']],
            body: tableData,
            startY: 30,
            margin: { horizontal: 10 },
            styles: { fontSize: 10 },
        });

        doc.save('inquire_report.pdf');
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
    <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Inquire List</h1>

        <div className="flex gap-x-4 items-center">
            <input
                type="text"
                placeholder="Search inquiries..."
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
                onClick={() => (window.location.href = "/Inquire/create")}
            >
                Add
            </button>
        </div>
    </div>

    <table className='w-full border-separate border-spacing-2'>
        <thead>
            <tr>
                <th className='border px-4 py-2 text-left'>Name</th>
                <th className='border px-4 py-2 text-left'>Number</th>
                <th className='border px-4 py-2 text-left'>Email</th>
                <th className='border px-4 py-2 text-left'>Service Type</th>
                <th className='border px-4 py-2 text-left'>Vehicle Number</th>
                <th className='border px-4 py-2 text-left'>Message</th>
                <th className='border px-4 py-2 text-left'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {loading ? (
                <tr><td colSpan='9'>Loading...</td></tr>
            ) : (
                filteredInquire.map((Inquire) => (
                    <tr key={Inquire._id}>
                        <td className='border px-4 py-2 text-left'>{Inquire.Name}</td>
                        <td className='border px-4 py-2 text-left'>{Inquire.Number}</td>
                        <td className='border px-4 py-2 text-left'>{Inquire.Email}</td>
                        <td className='border px-4 py-2 text-left'>{Inquire.ServiceType}</td>
                        <td className='border px-4 py-2 text-left'>{Inquire.VehicleNumber}</td>
                        <td className='border px-4 py-2 text-left'>{Inquire.Message}</td>
                        <td className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4'>
                                <Link to={`/Inquire/${Inquire._id}`}>
                                    <BsInfoCircle className="text-2x1 text-green-800" />
                                </Link>
                                <Link to={`/Inquire/edit/${Inquire._id}`}>
                                    <AiOutlineEdit className="text-2x1 text-yellow-600" />
                                </Link>
                                <Link to={`/Inquire/delete/${Inquire._id}`}>
                                    <MdOutlineDelete className="text-2x1 text-red-600" />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
</div>
);
}

export default ShowInquire;
