import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
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
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8077/Employee/${id}`)
            .then((response) => {
                const employee = response.data;
    
                // Convert DOB to yyyy-MM-dd format
                const formattedDOB = new Date(employee.DOB).toISOString().split('T')[0];
    
                setEmpID(employee.EmpID);
                setEmployeeName(employee.employeeName);
                setDOB(formattedDOB);  // Set the formatted date here
                setNIC(employee.NIC);
                setAddress(employee.Address);
                setBasicSalary(employee.BasicSalary);
                setContactNo(employee.ContactNo);
                setEmail(employee.Email);
                setLoading(false);
            }).catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);
    
    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const handleEditEmployee = (e) => {
        e.preventDefault(); // Prevent default form submission
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
        axios
            .put(`http://localhost:8077/Employee/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/Employee'); // Navigate to /Employee after successful save
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };
  
    return (
        <div>
            <h1>Edit Employee</h1>
            <div>
                <form onSubmit={handleEditEmployee}>
                    <div>
                        <label style={labelStyle}>Employee ID:</label>
                        <input type="text" id="EmpID" value={EmpID} onChange={(e) => setEmpID(e.target.value)} readOnly />
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
                        <button type="submit">Save</button> {/* Use type="submit" to trigger form submission */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
