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

  const styles = {
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
    },
    value: {
      fontSize: '16px',
    },
    employeeField: {
      marginBottom: '10px',
    },
  };

  return (
    <div>
      <h1>Show Employee</h1>
      <div>
        <div>
          <div style={styles.employeeField}>
            <span style={styles.label}>Emp ID:</span>
            <span style={styles.value}>{employee.EmpID}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>Employee Name:</span>
            <span style={styles.value}>{employee.employeeName}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>DOB:</span>
            <span style={styles.value}>{employee.DOB}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>NIC:</span>
            <span style={styles.value}>{employee.NIC}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>Address:</span>
            <span style={styles.value}>{employee.Address}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>Basic Salary:</span>
            <span style={styles.value}>{employee.BasicSalary}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>Contact No:</span>
            <span style={styles.value}>{employee.ContactNo}</span>
          </div>
          <div style={styles.employeeField}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{employee.Email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOneEmployee;
