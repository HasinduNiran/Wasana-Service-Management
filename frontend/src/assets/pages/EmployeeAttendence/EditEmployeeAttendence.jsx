import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import Swal from 'sweetalert2';
import img1 from '../../images/bg02.jpg';
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'

const EditEmployeeAttendence = () => {
    const [EmpID, setEmpID] = useState('');
    const [employeeName, setemployeeName] = useState('');
    const [date, setdate] = useState('');
    const [InTime, setInTime] = useState('');
    const [OutTime, setOutTime] = useState('');
    const [WorkingHours, setWorkingHours] = useState('');
    const [OThours, setOThours] = useState('');
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:8077/EmployeeAttendence/${id}`)
      .then((response) => {
          setEmpID(response.data.EmpID);
          setemployeeName(response.data.employeeName);
          setdate(response.data.date);
          setInTime(response.data.InTime);
          setOutTime(response.data.OutTime);
          setWorkingHours(response.data.WorkingHours);
          setOThours(response.data.OThours);
          setLoading(false);
        }).catch((error) => {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred. Please check the console.',
          });
          console.error(error);
        });
    }, [id]);
    
    const handleEditEmployeeAttendence = () => {
  
      if (!EmpID || !employeeName || !date) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in fields Emp ID, Employee Name, and Date.',
        });
        return;
      }
  
      const Ddate = new Date(date);
      const currentDate = new Date();
      if (Ddate > currentDate) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Date cannot be a future date.',
        });
        return;
      }
  
      const data = {
        EmpID,
        employeeName,
        date,
        InTime,
        OutTime,
        WorkingHours,
        OThours
      };
      setLoading(true);
      axios
        .put(`http://localhost:8077/EmployeeAttendence/${id}`, data)
        .then(() => {
          setLoading(false);
          navigate('/EmployeeAttendence/EmpADashboard');
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while saving data.',
          });
          console.error(error);
        });
    };
  
    const handleInTimeChange = (e) => {
      setInTime(e.target.value);
      calculateHoursWorked(e.target.value, OutTime);
    };
  
    const handleOutTimeChange = (e) => {
      setOutTime(e.target.value);
      calculateHoursWorked(InTime, e.target.value);
    };
  
    const calculateHoursWorked = (inTime, outTime) => {
      const inTimeParts = inTime.split(':');
      const outTimeParts = outTime.split(':');
  
      const inTimeDate = new Date(
        2000,
        0,
        1,
        parseInt(inTimeParts[0]),
        parseInt(inTimeParts[1]),
        0
      );
      const outTimeDate = new Date(
        2000,
        0,
        1,
        parseInt(outTimeParts[0]),
        parseInt(outTimeParts[1]),
        0
      );
  
      if (isNaN(inTimeDate.getTime()) || isNaN(outTimeDate.getTime())) {
        console.error('Invalid input time format');
        return;
      }
  
      const timeDiff = outTimeDate - inTimeDate;
      const hoursWorked = timeDiff / (1000 * 60 * 60);
      const normalWorkingHours = 8;
  
      if (hoursWorked > normalWorkingHours) {
        const overtimeHours = hoursWorked - normalWorkingHours;
        setOThours(overtimeHours.toFixed(2));
        setWorkingHours(normalWorkingHours.toFixed(2));
      } else {
        setOThours('0.00');
        setWorkingHours(hoursWorked.toFixed(2));
      }
    };
  
    const handleRecordInTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const newInTime = `${hours}:${minutes}`;
      setInTime(newInTime);
      calculateHoursWorked(newInTime, OutTime);
    };
    
    const handleRecordOutTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const newOutTime = `${hours}:${minutes}`;
      setOutTime(newOutTime);
      calculateHoursWorked(InTime, newOutTime);
    };
  
    const styles = {
      container: {
        marginLeft: '15%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        minHeight: '100vh',
        position: 'relative',
        fontFamily: '"Noto Sans", sans-serif',
      },
      backButton: {
        alignSelf: 'flex-start',
        marginBottom: '20px',
      },
      image: {
        position: 'absolute', 
        marginTop: '51%',
        marginLeft: '-64%',
        transform: 'translateY(-50%)',
        borderRadius: "30px",
        maxWidth: "240px",
        padding: "0px",
        height: "570px",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
        zIndex: 1, 
      },
      heading: {
        color: '#ffffff',
        fontSize: '2.5rem',
        marginBottom: '30px',
        zIndex: 2, 
      },
      formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#2a2a2a',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 2, 
      },
      formRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px',
      },
      formGroup: {
        flex: '1 1 45%',
        display: 'flex',
        flexDirection: 'column',
      },
      label: {
        color: '#ffffff',
        marginBottom: '5px',
        fontSize: '1rem',
        fontWeight: '600',
      },
      input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#333',
        color: '#fff',
      },
      timeButton: {
        padding: '10px',
        fontSize: '1rem',
        marginTop: '10px',
        backgroundColor: '#991b1b',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
      buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
      },
      button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#991b1b',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    };
  
    return (
      <div className=''><Navbar/>
      <div style={styles.container}>
        <h1 style={styles.heading}>Edit Employee Attendance</h1>
        {loading ? <Spinner /> : ''}
        <img
          src={img1}
          style={styles.image}
          alt="background"
        />
        <div style={styles.formContainer}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>EmpID</label>
              <select
                value={EmpID}
                onChange={(e) => setEmpID(e.target.value)}
                style={styles.input}
              >
                <option value=''>Select EmpID</option>
                {/* Map through employees if you have a list */}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Employee Name</label>
              <select
                value={employeeName}
                onChange={(e) => setemployeeName(e.target.value)}
                style={styles.input}
              >
                <option value=''>Select Employee Name</option>
                {/* Map through employees if you have a list */}
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type='date'
                value={date}
                onChange={(e) => setdate(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>In Time</label>
              <input
                type='time'
                value={InTime}
                onChange={handleInTimeChange}
                style={styles.input}
              />
              <button
                type='button'
                onClick={handleRecordInTime}
                style={styles.timeButton}
              >
                Record Current Time
              </button>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Out Time</label>
              <input
                type='time'
                value={OutTime}
                onChange={handleOutTimeChange}
                style={styles.input}
              />
              <button
                type='button'
                onClick={handleRecordOutTime}
                style={styles.timeButton}
              >
                Record Current Time
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Working Hours</label>
              <input
                type='text'
                value={WorkingHours}
                readOnly
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Over Time Hours</label>
              <input
                type='text'
                value={OThours}
                readOnly
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              type='button'
              onClick={handleEditEmployeeAttendence}
              style={styles.button}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    );
};

export default EditEmployeeAttendence;
