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
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
            <form onSubmit={handleEditEmployee}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Employee ID:</label>
                    <input 
                        type="text" 
                        id="EmpID" 
                        value={EmpID} 
                        onChange={(e) => setEmpID(e.target.value)} 
                        readOnly 
                        className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Employee Name:</label>
                    <input 
                        type="text" 
                        id="employeeName" 
                        value={employeeName} 
                        onChange={(e) => setEmployeeName(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Date of Birth:</label>
                    <input 
                        type="date" 
                        id="DOB" 
                        value={DOB} 
                        onChange={(e) => setDOB(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">NIC:</label>
                    <input 
                        type="text" 
                        id="NIC" 
                        value={NIC} 
                        onChange={(e) => setNIC(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Address:</label>
                    <input 
                        type="text" 
                        id="Address" 
                        value={Address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Basic Salary:</label>
                    <input 
                        type="number" 
                        id="BasicSalary" 
                        value={BasicSalary} 
                        onChange={(e) => setBasicSalary(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Contact Number:</label>
                    <input 
                        type="number" 
                        id="ContactNo" 
                        value={ContactNo} 
                        onChange={(e) => setContactNo(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input 
                        type="email" 
                        id="Email" 
                        value={Email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditEmployee;
