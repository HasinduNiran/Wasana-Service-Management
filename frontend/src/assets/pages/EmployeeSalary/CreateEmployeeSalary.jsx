import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import img1 from '../../images/bg02.jpg';
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'

const CreateEmployeeSalary = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalOThours, setTotalOThours] = useState('');
  const [totalOTpay, setTotalOTpay] = useState('');
  const [BasicSalary, setBasicSalary] = useState('');
  const [TotalSalary, setTotalSalary] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Use useNavigate hook

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
    <div className=''><Navbar/>
    <div style={styles.container}>
      <BackButton destination={`/vacancy`} style={styles.backButton} />
      <img
        src={img1}
        style={styles.image}
        alt="car"
      />
      <form onSubmit={handleSaveEmployeeSalary} style={styles.form}>
        <h2 style={styles.title}>Add Employee Salary</h2>
        <div style={styles.flex}>
          <input
            type="text"
            placeholder="Employee ID"
            value={EmpID}
            onChange={(e) => setEmpID(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
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
            onChange={(e) => setTotalOThours(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Total OT Pay"
            value={totalOTpay}
            onChange={(e) => setTotalOTpay(e.target.value)}
            required
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
            onChange={(e) => setTotalSalary(e.target.value)}
            required
            style={styles.input}
          />
          </div>
        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor)
          }
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default CreateEmployeeSalary;
