import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ShowEmployeeSalary() {
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSalaries, setFilteredSalaries] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8077/EmployeeSalary') // Ensure this URL is correct
            .then((response) => {
                console.log('API Response:', response.data); // Log the response to check its structure
                const data = response.data;
                if (Array.isArray(data)) {
                    setEmployeeSalary(data);
                    setFilteredSalaries(data); // Initialize with all employee salaries
                } else {
                    console.warn('Data is not an array:', data);
                    setEmployeeSalary([]); // Fallback to an empty array
                    setFilteredSalaries([]); // Fallback to an empty array
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employee salaries:', error);
                setEmployeeSalary([]); // Fallback to an empty array on error
                setFilteredSalaries([]); // Fallback to an empty array on error
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        handleSearch(); // Re-filter salaries when searchQuery changes
    }, [searchQuery]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = employeeSalary.filter((employee) => {
            return (
                employee.EmpID.toLowerCase().includes(query) ||
                employee.employeeName.toLowerCase().includes(query) ||
                employee.fromDate.toLowerCase().includes(query) ||
                employee.toDate.toLowerCase().includes(query) ||
                String(employee.totalOThours).toLowerCase().includes(query) ||
                String(employee.totalOTpay).toLowerCase().includes(query) ||
                String(employee.BasicSalary).toLowerCase().includes(query) ||
                String(employee.TotalSalary).toLowerCase().includes(query)
            );
        });
        setFilteredSalaries(filtered);
    };
    

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Employee Salary Report', 14, 16);

        doc.autoTable({
            startY: 22,
            head: [['ID', 'Name', 'From', 'To', 'Total OT Hours', 'Total OT Pay', 'Basic Salary', 'Total Salary']],
            body: filteredSalaries.map(employee => [
                employee.EmpID,
                employee.employeeName,
                employee.fromDate,
                employee.toDate,
                employee.totalOThours,
                employee.totalOTpay,
                employee.BasicSalary,
                employee.TotalSalary
            ]),
        });

        doc.save('employee-salary-report.pdf');
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Employee Salary List</h1>
                <div className="flex justify-center items-center mt-8">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => window.location.href='/EmployeeSalary/create'}
                    >
                        Add Employee Salary
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
                        <th className='border px-4 py-2 text-left'>From</th>
                        <th className='border px-4 py-2 text-left'>To</th>
                        <th className='border px-4 py-2 text-left'>Total OT Hours</th>
                        <th className='border px-4 py-2 text-left'>Total OT Pay</th>
                        <th className='border px-4 py-2 text-left'>Basic Salary</th>
                        <th className='border px-4 py-2 text-left'>Total Salary</th>
                        <th className='border px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan='9'>Loading...</td></tr>
                    ) : (
                        filteredSalaries.length > 0 ? (
                            filteredSalaries.map((employee) => (
                                <tr key={employee._id}>
                                    <td className='border px-4 py-2 text-left'>{employee.EmpID}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.employeeName}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.fromDate}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.toDate}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.totalOThours}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.totalOTpay}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.BasicSalary}</td>
                                    <td className='border px-4 py-2 text-left'>{employee.TotalSalary}</td>
                                    <td className='border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/EmployeeSalary/edit/${employee._id}`}>Edit</Link>
                                            <Link to={`/EmployeeSalary/delete/${employee._id}`}>Delete</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan='9'>No employee salaries found.</td></tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowEmployeeSalary;
