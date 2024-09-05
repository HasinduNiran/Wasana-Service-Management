import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ShowCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8077/Customer')
            .then((response) => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setCustomers(data);
                    setFilteredCustomers(data); // Initialize with all customers
                } else {
                    console.warn('Data is not an array:', data);
                    setCustomers([]);
                    setFilteredCustomers([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching customer data:', error);
                setCustomers([]);
                setFilteredCustomers([]);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        handleSearch(); // Re-filter customers when searchQuery changes
    }, [searchQuery]);

    const handleSearch = () => {
        const filtered = customers.filter((customer) =>
            customer.cusID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.NIC.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCustomers(filtered);
    };

    const maskPassword = (password) => {
        return '•'.repeat(password.length);
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Customer Report', 14, 16);

        doc.autoTable({
            startY: 22,
            head: [['Customer ID', 'First Name', 'Last Name', 'NIC', 'Phone', 'Email']],
            body: filteredCustomers.map(customer => [
                customer.cusID,
                customer.firstName,
                customer.lastName,
                customer.NIC,
                customer.phone,
                customer.email
            ]),
        });

        doc.save('customer-report.pdf');
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
                <h1 className='text-3xl my-8'>Customer List</h1>
                <div className="flex justify-center items-center mt-8">
                    <button
                        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => (window.location.href = "/Customer/create")}
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
                        <th className='border px-4 py-2 text-left'>Customer ID</th>
                        <th className='border px-4 py-2 text-left'>First Name</th>
                        <th className='border px-4 py-2 text-left'>Last Name</th>
                        <th className='border px-4 py-2 text-left'>NIC</th>
                        <th className='border px-4 py-2 text-left'>Phone</th>
                        <th className='border px-4 py-2 text-left'>Email</th>
                        <th className='border px-4 py-2 text-left'>Password</th>
                        <th className='border px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan='8'>Loading...</td></tr>
                    ) : (
                        filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer, index) => (
                                <tr key={customer._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                    <td className='border px-4 py-2'>{customer.cusID}</td>
                                    <td className='border px-4 py-2'>{customer.firstName}</td>
                                    <td className='border px-4 py-2'>{customer.lastName}</td>
                                    <td className='border px-4 py-2'>{customer.NIC}</td>
                                    <td className='border px-4 py-2'>{customer.phone}</td>
                                    <td className='border px-4 py-2'>{customer.email}</td>
                                    <td className='border px-4 py-2'>{maskPassword(customer.password)}</td>
                                    <td className='border px-4 py-2'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/Customer/${customer.cusID}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/Customer/edit/${customer._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/Customer/delete/${customer._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan='8'>No customers found</td></tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowCustomer;
