import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateApplicant = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [jobType, setJobType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!number.trim()) {
      errors.number = 'Phone number is required';
      isValid = false;
    } else if (!/^[0][0-9]{9}$/.test(number)) {
      errors.number = 'Phone number must start with 0 and be 10 digits long';
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!jobType.trim()) {
      errors.jobType = 'Job type is required';
      isValid = false;
    }

    if (!message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Problem with Applicant submission',
        html: Object.values(errors).map(error => `<p>${error}</p>`).join(''),
      });
    }

    setErrors(errors);
    return isValid;
  };

  const handleSaveApplicant = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const data = {
      FirstName: firstName,
      LastName: lastName,
      Number: number,
      Email: email,
      JobType: jobType,
      Message: message,
    };

    axios
      .post('http://localhost:8077/applicant', data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Applicant created successfully',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        setTimeout(() => {
          setLoading(false);
          navigate('/applicant');
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Applicant submission failed',
          text: 'Please check the provided details or try again later',
        });
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Add Applicant</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Job Type</label>
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleSaveApplicant}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    width: '50%',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
    position: 'relative',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: 'red',
    textTransform: 'uppercase',
    backgroundColor: 'black',
    display: 'block',
    padding: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1.2rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    textAlign: 'left',
    marginTop: '0.5rem',
  },
};

export default CreateApplicant;
