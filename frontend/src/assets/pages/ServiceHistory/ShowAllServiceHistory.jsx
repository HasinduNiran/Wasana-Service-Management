import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const ShowAllServiceHistory = () => {
    const [serviceHistories, setServiceHistories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServiceHistories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8077/ServiceHistory');
                console.log(response.data); // Log the response data
                setServiceHistories(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("There was an error fetching the service histories!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceHistories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service history?")) {
            try {
                await axios.delete(`http://localhost:8077/ServiceHistory/${id}`);
                setServiceHistories(serviceHistories.filter((history) => history._id !== id));
                alert("Service history deleted successfully!");
            } catch (error) {
                console.error("There was an error deleting the service history!", error);
                alert("Failed to delete service history. Please try again.");
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
            <h2>All Service Histories</h2>
            <button onClick={() => window.location.href = '/ServiceHistory/create'}>
                Add Service History
            </button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                serviceHistories.length === 0 ? (
                    <p>No service histories available.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Service ID</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Allocated Employee</th>
                                <th>Vehicle Number</th>
                                <th>Service History</th>
                                <th>Service Date</th>
                                <th>Mileage</th>
                                <th>Package</th>
                                <th>Selected Services</th>
                                <th>Booking ID</th>
                                <th>Next Service</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceHistories.map((history) => (
                                <tr key={history._id}>
                                    <td>{history._id}</td>
                                    <td>{history.Customer_Name}</td>
                                    <td>{history.Customer_Email}</td>
                                    <td>{history.Allocated_Employee}</td>
                                    <td>{history.Vehicle_Number}</td>
                                    <td>{history.Service_History}</td>
                                    <td>{new Date(history.Service_Date).toLocaleDateString()}</td>
                                    <td>{history.Milage}</td>
                                    <td>{history.Package}</td>
                                    <td>{history.selectedServices.join(", ")}</td>
                                    <td>{history.Booking_Id}</td>
                                    <td>{new Date(history.nextService).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <div className="flex gap-x-4">
                                            <Link to={`/ServiceHistory/${history._id}`}>
                                                <BsInfoCircle className="text-2xl text-green-800" />
                                            </Link>
                                            <Link to={`/ServiceHistory/edit/${history._id}`}>
                                                <AiOutlineEdit className="text-2xl text-yellow-600" />
                                            </Link>
                                            <button onClick={() => handleDelete(history._id)}>
                                                <MdOutlineDelete className="text-2xl text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default ShowAllServiceHistory;

