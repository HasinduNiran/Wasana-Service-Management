import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf'; // For generating PDF reports
import 'jspdf-autotable'; // For generating tables in PDF

const ShowEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/Employee')
            .then((response) => {
                setEmployees(response.data.data);
                setFilteredEmployees(response.data.data); // Initialize with all employees
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        handleSearch(); // Re-filter employees when searchQuery changes
    }, [searchQuery]);

    const handleSearch = () => {
        const filtered = employees.filter((employee) =>
            employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.DOB.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.BasicSalary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.ContactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.Email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Employee Report', 14, 16);

        doc.autoTable({
            startY: 22,
            head: [['ID', 'Name', 'Date of Birth', 'NIC', 'Address', 'Basic Salary', 'Contact No', 'Email']],
            body: filteredEmployees.map(employee => [
                employee.EmpID,
                employee.employeeName,
                employee.DOB,
                employee.NIC,
                employee.Address,
                employee.BasicSalary,
                employee.ContactNo,
                employee.Email
            ]),
        });

        doc.save('employee-report.pdf');
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
                <h1 className='text-3xl my-8'>Employee List</h1>
                <div className="flex justify-center items-center mt-8">
                    <button
                        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/Employee/create")}
                    >
                        Add
                    </button>
                    <button
                        className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={generateReport}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
            <div className='my-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='p-2 border rounded'
                />
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
                        filteredEmployees.length === 0 ? (
                            <tr><td colSpan='9'>No employees found.</td></tr>
                        ) : (
                            filteredEmployees.map((employee) => (
                                <tr key={employee._id}>
                                    <td className='border px-4 py-2 text-left'>{employee.EmpID}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.employeeName}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.DOB}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.NIC}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.Address}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.BasicSalary}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.ContactNo}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.Email}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/Employee/${employee._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/Employee/edit/${employee._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/Employee/delete/${employee._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowEmployee;
