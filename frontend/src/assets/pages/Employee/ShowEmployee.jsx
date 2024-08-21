import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const ShowEmployee = () => {
    const [Employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(false); // Fixed initializing loading state as false

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Employee')
            .then((response) => {
                setEmployee(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
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
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee List</h1>

                <div className="flex justify-center items-center mt-8">
                <button
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = "/Employee/create")}
          >
            Add
          </button>
                </div>
            </div>

            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2 text-left'>ID</th>
                        <th className='border px-4 py-2 text-left'>Name</th>
                        <th className='border px-4 py-2 text-left'>Date of Birth</th>
                        <th className='border px-4 py-2 text-left'>NIC</th>
                        <th className='border px-4 py-2 text-left'>Address</th>
                        <th className='border px-4 py-2 text-left'>Basic Salary</th>
                        <th className='border px-4 py-2 text-left'>Contact No</th>
                        <th className='border px-4 py-2 text-left'>Email</th>
                        <th className='border px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan='9'>Loading...</td></tr>
                    ) : (
                        Employee.map((Employee) => (
                            <tr key={Employee._id}>
                                <td className='border px-4 py-2 text-left'>{Employee.EmpID}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.employeeName}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.DOB}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.NIC}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.Address}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.BasicSalary}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.ContactNo}</td>
                                <td className='border px-4 py-2 text-left'>{Employee.Email}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/Employee/${Employee._id}`}>
                                            <BsInfoCircle className='text-2x1 text-green-800' />
                                        </Link>
                                        <Link to={`/Employee/edit/${Employee._id}`}>
                                            <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                        </Link>
                                        <Link to={`/Employee/delete/${Employee._id}`}>
                                            <MdOutlineDelete className='text-2x1 text-red-600' />
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
};

export default ShowEmployee;
