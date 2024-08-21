import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeSalary = () => {
    const [EmpID, setEmpID] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [totalOThours, setTotalOThours] = useState('');
    const [totalOTpay, setTotalOTpay] = useState('');
    const [BasicSalary, setBasicSalary] = useState('');
    const [TotalSalary, setTotalSalary] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); 
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8077/EmployeeSalary/${id}`)
            .then((response) => {
                const employeeSalary = response.data;
                setEmpID(employeeSalary.EmpID);
                setEmployeeName(employeeSalary.employeeName);
                setFromDate(employeeSalary.fromDate);
                setToDate(employeeSalary.toDate);
                setTotalOThours(employeeSalary.totalOThours);
                setTotalOTpay(employeeSalary.totalOTpay);
                setBasicSalary(employeeSalary.BasicSalary);
                setTotalSalary(employeeSalary.TotalSalary);
                setLoading(false);
            }).catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);

    const handleEditEmployeeSalary = (e) => {
      e.preventDefault(); 
      const data = {
        EmpID,
        employeeName,
        fromDate,
        toDate,
        totalOThours,
        totalOTpay,
        BasicSalary,
        TotalSalary,
      };
      
      setLoading(true);
      
      axios.put(`http://localhost:8077/EmployeeSalary/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/EmployeeSalary'); 
            })
            .catch((error) => {
                setLoading(false);
                console.error('Update error:', error);
            });
    };
  
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit Employee Salary</h1>
        <form onSubmit={handleEditEmployeeSalary}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Employee ID:</label>
            <input
              type="text"
              id="EmpID"
              value={EmpID}
              onChange={(e) => setEmpID(e.target.value)}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">From:</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">To:</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total OT hours:</label>
            <input
              type="text"
              id="totalOThours"
              value={totalOThours}
              onChange={(e) => setTotalOThours(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total OT pay:</label>
            <input
              type="number"
              id="totalOTpay"
              value={totalOTpay}
              onChange={(e) => setTotalOTpay(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Basic Salary:</label>
            <input
              type="number"
              id="BasicSalary"
              value={BasicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total Salary:</label>
            <input
              type="number"
              id="TotalSalary"
              value={TotalSalary}
              onChange={(e) => setTotalSalary(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {loading ? 'Loading...' : 'Edit Employee Salary'}
            </button>
          </div>
        </form>
      </div>
    );
  };

export default EditEmployeeSalary;
