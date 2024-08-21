import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [EmpID, setEmpID] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [DOB, setDOB] = useState("");
    const [NIC, setNIC] = useState("");
    const [Address, setAddress] = useState("");
    const [BasicSalary, setBasicSalary] = useState("");
    const [ContactNo, setContactNo] = useState("");
    const [Email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            EmpID,
            employeeName,
            DOB,
            NIC,
            Address,
            BasicSalary,
            ContactNo,
            Email
        };
        setLoading(true);
        try {
            await axios.post('http://localhost:8077/Employee', data);
            setLoading(false);
            navigate('/Employee');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
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
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }
  
          form {
            display: flex;
            flex-direction: column;
          }
  
          label {
            margin-bottom: 5px;
            color: #555;
            font-weight: bold;
          }
  
          input[type="text"],
          input[type="number"],
          input[type="date"],
          input[type="email"] {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            width: 100%;
          }
  
          button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            margin-top: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-size: 16px;
          }
  
          button:hover {
            background-color: #45a049;
          }
  
          @media screen and (max-width: 768px) {
            .container {
              padding: 10px;
            }
  
            input[type="text"],
            input[type="date"],
            input[type="email"] {
              padding: 8px;
              font-size: 14px;
            }
  
            button {
              padding: 8px 16px;
              font-size: 14px;
            }
          }
        `}</style>
            <h1>Create Employee</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={labelStyle}>Employee ID:</label>
                        <input type="text" id="EmpID" value={EmpID} onChange={(e) => setEmpID(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Employee Name:</label>
                        <input type="text" id="employeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Date of Birth:</label>
                        <input type="date" id="DOB" value={DOB} onChange={(e) => setDOB(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>NIC:</label>
                        <input type="text" id="NIC" value={NIC} onChange={(e) => setNIC(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Address:</label>
                        <input type="text" id="Address" value={Address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Basic Salary:</label>
                        <input type="number" id="BasicSalary" value={BasicSalary} onChange={(e) => setBasicSalary(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Contact Number:</label>
                        <input type="number" id="ContactNo" value={ContactNo} onChange={(e) => setContactNo(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Email:</label>
                        <input type="email" id="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Create Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
