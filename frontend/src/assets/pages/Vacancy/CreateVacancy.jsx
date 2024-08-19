import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const CreateVacancy = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'description is required';
      isValid = false;
    }


    if (!isValid) {
      // Display SweetAlert for errors
      Swal.fire({
        icon: 'error',
        title: 'Problem with Vacancy creation',
        html: Object.values(errors).map(error => `<p>${error}</p>`).join(''),
      });
    }

    setErrors(errors);
    return isValid;
  };


  const handleSaveVacancy = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const itemNameUpperCase = name.toUpperCase(); 

   

    const data = {
      Name: itemNameUpperCase, // Save  name in uppercase
      Description: description,
      
    };

    axios
      .post('http://localhost:8077/vacancy', data)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Job item created successfully',
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
          navigate('/');
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please check console');
        Swal.fire({
          icon: 'error',
          title: 'Job item already exists',
          text: 'Please check Job the item name or update the existing item',
        });
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      {/* Loading spinner */}
      {loading ? <Spinner /> : ''}
      <div style={styles.formContainer}>
        {/* Form heading */}
        <h1 style={styles.heading}>Add Vacancy</h1>
        {/* Name input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>

        {/* Supplier Name input field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Job Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
          />
          {errors.description && <p style={styles.error}>{errors.description}</p>}
        </div>
        

        {/* Save button */}
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleSaveVacancy}>
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
   // backgroundImage: `url(${backgroundImage})`,
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

export default CreateVacancy;
