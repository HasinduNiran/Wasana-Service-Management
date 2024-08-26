import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import img1 from '../../images/bg02.jpg';
import BackButton from '../../components/BackButton';

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
       <div className="mar"><BackButton destination={`/vacancy`}/></div>
      <img
        src={img1}
        style={styles.image}
        alt="background"
      />
      <form style={styles.form}>
        <h2 style={styles.title}>Add Applicant</h2>
        <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
        </div>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Job Type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button
          style={styles.submitButton}
          onClick={handleSaveApplicant}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: '"Noto Sans", sans-serif',
  },
  form: {
    borderRadius: '30px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    maxWidth: '360px',
    padding: '20px',
    height: 'auto',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
  },
  title: {
    color: '#6c1c1d',
    fontSize: '30px',
    fontWeight: '600',
    paddingLeft: '30px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid rgba(105, 105, 105, 0.397)',
    borderRadius: '10px',
    fontSize: '1rem',
    padding: '15px 8px',
    outline: '0',
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
  },
  submitButton: {
    border: 'none',
    backgroundColor: '#6c1c1d',
    marginTop: '10px',
    outline: 'none',
    padding: '10px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    width: '100%',
    cursor: 'pointer',
  },
  submitButtonHover: {
    backgroundColor: '#661003f5',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
  },
  image: {
    borderRadius: '30px',
    maxWidth: '240px',
    padding: '0px',
    height: '632px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  flex: {
    display: 'flex',
    gap: '8px',
    marginTop: '15px',
  }
};

export default CreateApplicant;
