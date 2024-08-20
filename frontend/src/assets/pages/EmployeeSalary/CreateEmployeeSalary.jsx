import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeSalary = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalOThours, setTotalOThours] = useState('');
  const [totalOTpay, setTotalOTpay] = useState('');
  const [BasicSalary, setBasicSalary] = useState('');
  const [TotalSalary, setTotalSalary] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Use useNavigate hook

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const handleSaveEmployeeSalary = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
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
    
    axios.post('http://localhost:8077/EmployeeSalary', data)
      .then((response) => {
        console.log(response);
        setLoading(false);
        navigate('/EmployeeSalary'); // Navigate to EmployeeSalary page after successful save
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Create Employee Salary</h1>
      <div>
        <form onSubmit={handleSaveEmployeeSalary}>
          <div>
            <label style={labelStyle}>Employee ID:</label>
            <input
              type="text"
              id="EmpID"
              value={EmpID}
              onChange={(e) => setEmpID(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Employee Name:</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setemployeeName(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>From:</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>To:</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Total OT hours:</label>
            <input
              type="text"
              id="totalOThours"
              value={totalOThours}
              onChange={(e) => setTotalOThours(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Total OT pay:</label>
            <input
              type="number"
              id="totalOTpay"
              value={totalOTpay}
              onChange={(e) => setTotalOTpay(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Basic Salary:</label>
            <input
              type="number"
              id="BasicSalary"
              value={BasicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Total Salary:</label>
            <input
              type="number"
              id="TotalSalary"
              value={TotalSalary}
              onChange={(e) => setTotalSalary(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Create Employee Salary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeSalary;
