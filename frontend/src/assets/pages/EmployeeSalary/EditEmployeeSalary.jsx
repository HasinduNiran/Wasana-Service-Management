import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeSalary = () => {
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
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8077/EmployeeSalary/${id}`)
            .then((response) => {
                const employeeSalary = response.data;
                setEmpID(employeeSalary.EmpID);
                setemployeeName(employeeSalary.employeeName);
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

    const labelStyle = {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    };
  
    const handleEditEmployeeSalary = (e) => {
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
      
      axios
            .put(`http://localhost:8077/EmployeeSalary/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/EmployeeSalary'); // Navigate to /Employee after successful save
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };
  
    return (
      <div>
        <h1>Edit Employee Salary</h1>
        <div>
          <form onSubmit={handleEditEmployeeSalary}>
            <div>
              <label style={labelStyle}>Employee ID:</label>
              <input
                type="text"
                id="EmpID"
                value={EmpID}
                onChange={(e) => setEmpID(e.target.value)}
               readOnly
              />
            </div>
            <div>
              <label style={labelStyle}>Employee Name:</label>
              <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setemployeeName(e.target.value)}
                readOnly
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
                {loading ? 'Loading...' : 'Edit Employee Salary'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default EditEmployeeSalary