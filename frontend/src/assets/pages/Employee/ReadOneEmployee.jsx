import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadOneEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8077/Employee/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="mb-4">
            <span className="font-bold">Emp ID:</span>
            <span className="ml-2 text-gray-700">{employee.EmpID}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Employee Name:</span>
            <span className="ml-2 text-gray-700">{employee.employeeName}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">DOB:</span>
            <span className="ml-2 text-gray-700">{employee.DOB}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">NIC:</span>
            <span className="ml-2 text-gray-700">{employee.NIC}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Address:</span>
            <span className="ml-2 text-gray-700">{employee.Address}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Basic Salary:</span>
            <span className="ml-2 text-gray-700">{employee.BasicSalary}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Contact No:</span>
            <span className="ml-2 text-gray-700">{employee.ContactNo}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Email:</span>
            <span className="ml-2 text-gray-700">{employee.Email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneEmployee;
