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
        <div>
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
