import React, { useState, useEffect } from 'react';
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
  const [jobTypes, setJobTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const vacancyResponse = await axios.get('http://localhost:8077/vacancy');
        setJobTypes(vacancyResponse.data); // Expecting an array of vacancies
      } catch (error) {
        console.error('Error fetching job types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

    try {
      await axios.post('http://localhost:8077/applicant', data);
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
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Applicant submission failed',
        text: 'Please check the provided details or try again later',
      });
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      {loading && <Spinner />}
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Add Applicant</h1>
        {/* Form fields */}
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
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Job Type</option>
            {jobTypes.map((job) => (
              <option key={job._id} value={job.Name}>
                {job.Name}
              </option>
            ))}
          </select>
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
    display: 'block',
    color: 'white',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1.2rem',
    backgroundColor: '#07b6b8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CreateApplicant;
