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
        <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Employee ID:</label>
                    <input 
                        type="text" 
                        id="EmpID" 
                        value={EmpID} 
                        onChange={(e) => setEmpID(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border rounded-md"
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
                        {loading ? "Loading..." : "Create Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEmployee;
