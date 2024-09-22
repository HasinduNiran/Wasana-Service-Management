import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BackButton from "../../components/BackButton";
import img1 from '../../images/bg02.jpg';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

const CreateEmployeeSalary = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalOThours, setTotalOThours] = useState(0);
  const [totalOTpay, setTotalOTpay] = useState(0);
  const [BasicSalary, setBasicSalary] = useState('');
  const [TotalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeesAttendance, setEmployeesAttendance] = useState([]);
  const [includeEPF, setIncludeEPF] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({ EmpID: '', employeeName: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8077/Employee');
        setEmployees(response.data.data);
      } catch (error) {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employees.' });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8077/EmployeeAttendence');
        setEmployeesAttendance(response.data.data);
      } catch (error) {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch attendance.' });
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleEmpIDChange = (e) => {
    const selectedEmpID = e.target.value;
    const selectedEmp = employees.find((emp) => emp.EmpID === selectedEmpID);
    setSelectedEmployee({
      EmpID: selectedEmpID,
      employeeName: selectedEmp ? selectedEmp.employeeName : '',
    });
    setBasicSalary(selectedEmp ? selectedEmp.BasicSalary : '');
  };

  const calculateTotalOvertimeHours = () => {
    const filteredAttendance = employeesAttendance.filter(
      (attendance) =>
        attendance.EmpID === selectedEmployee.EmpID &&
        attendance.date >= fromDate &&
        attendance.date <= toDate
    );

    const totalOvertimeHours = filteredAttendance.reduce(
      (total, attendance) => total + attendance.OThours,
      0
    );

    return totalOvertimeHours;
  };

  const handleSaveEmployeeSalary = async (e) => {
  e.preventDefault();

  if (!selectedEmployee.EmpID || !selectedEmployee.employeeName || !fromDate || !toDate || !BasicSalary) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill in all required fields.' });
    return;
  }

  if (toDate < fromDate) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'The "toDate" must be after the "fromDate".' });
    return;
  }

  const MAX_OHOURS = 48;
  const totalOvertimeHours = calculateTotalOvertimeHours();
  if (totalOvertimeHours < 0 || totalOvertimeHours > MAX_OHOURS) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Total OT hours must be between 0 and 48 hours.' });
    return;
  }

  const fDate = new Date(fromDate);
  const fcurrentDate = new Date();
  if (fDate > fcurrentDate) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'From Date cannot be a future date.' });
    return;
  }

  const tDate = new Date(toDate);
  if (tDate > fcurrentDate) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'To Date cannot be a future date.' });
    return;
  }

  // Calculate OT Pay
  const calculatedTotalOTpay = totalOvertimeHours * 585;
  
  // Update state for total OT hours and OT pay
  setTotalOThours(totalOvertimeHours);
  setTotalOTpay(calculatedTotalOTpay);

  let totalSalary = calculatedTotalOTpay + parseFloat(BasicSalary);
  if (includeEPF) {
    const epfAmount = totalSalary * 0.08;
    totalSalary -= epfAmount;
  }

  setTotalSalary(totalSalary);

  const data = {
    EmpID: selectedEmployee.EmpID,
    employeeName: selectedEmployee.employeeName,
    fromDate,
    toDate,
    totalOThours: totalOvertimeHours, 
    totalOTpay: calculatedTotalOTpay, 
    BasicSalary,
    TotalSalary: totalSalary,
  };

  setLoading(true);
  try {
    await axios.post('http://localhost:8077/EmployeeSalary', data);
    navigate('/EmployeeSalary');
  } catch (error) {
    console.error(error);
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to save employee salary.' });
  } finally {
    setLoading(false);
  }
};


  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: '"Noto Sans", sans-serif',
    },
    backButton: {
      marginBottom: "50%",
      marginLeft: "-80%",
      position: "absolute",
    },
    image: {
      borderRadius: "30px",
      maxWidth: "240px",
      padding: "0px",
      height: "585px",
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
    },
    form: {
      borderRadius: "30px",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      maxWidth: "450px",
      padding: "20px",
      height: "auto",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    },
    title: {
      color: "#6c1c1d",
      fontSize: "30px",
      fontWeight: "600",
      paddingLeft: "30px",
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    input: {
      backgroundColor: "#333",
      color: "#fff",
      border: "1px solid rgba(105, 105, 105, 0.397)",
      borderRadius: "10px",
      fontSize: "1rem",
      padding: "15px 8px",
      outline: "0",
      width: "100%",
      marginTop: "20px",
      marginBottom: "20px",
    },
    flex: {
      display: "flex",
      gap: "8px",
      marginTop: "15px",
    
    },
    submitButton: {
      border: "none",
      backgroundColor: "#6c1c1d",
      marginTop: "10px",
      outline: "none",
      padding: "10px",
      borderRadius: "10px",
      color: "#fff",
      fontSize: "16px",
      width: "100%",
      cursor: "pointer",
    },
    submitButtonHover: {
      backgroundColor: "#661003f5",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <BackButton destination={`/EmployeeSalary`} style={styles.backButton} />
        <img src={img1} style={styles.image} alt="car" />
        <form onSubmit={handleSaveEmployeeSalary} style={styles.form}>
          <h2 style={styles.title}>Add Employee Salary</h2>
          <div style={styles.flex}>
            <select
              value={selectedEmployee.EmpID}
              onChange={handleEmpIDChange}
              required
              style={styles.input}
            >
              <option value="">Select Employee ID</option>
              {employees.map((employee) => (
                <option key={employee.EmpID} value={employee.EmpID}>
                  {employee.EmpID}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Employee Name"
              value={selectedEmployee.employeeName}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.flex}>
            <input
              type="date"
              placeholder="From Date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="date"
              placeholder="To Date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.flex}>
            <input
              type="number"
              placeholder="Total OT Hours"
              value={totalOThours}
              readOnly
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Total OT Pay"
              value={totalOTpay}
              readOnly
              style={styles.input}
            />
          </div>
          <div style={styles.flex}>
            <input
              type="number"
              placeholder="Basic Salary"
              value={BasicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Total Salary"
              value={TotalSalary}
              readOnly
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};


export default CreateEmployeeSalary;
