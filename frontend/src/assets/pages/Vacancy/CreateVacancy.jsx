import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../CSS/createVacancy.css';
import img1 from '../../images/bg02.jpg';





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
          navigate('/vacancy');
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
    
    <div className="container">

   < img src={img1}  style={{
    borderRadius: '30px',
    maxWidth: '240px',
    padding: '0px',
    height: '350px',
    borderTopRightRadius:'0px',
    borderBottomRightRadius :'0px',
  }}  alt="car" />     
   {loading ? <Spinner /> : ''}
    <form  className="form" >
      <h2 className="title">Job Description</h2>
     
      <label>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}

        />
         {errors.name && <p style={styles.error}>{errors.name}</p>}
      </label>
      <label>
        <input
          type="text"
          placeholder="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         {errors.description && <p style={styles.error}>{errors.description}</p>}

      </label>
    
      <button className="submit" type="submit" onClick={handleSaveVacancy}>Submit</button>
      
    </form>
  </div>
  );
};



export default CreateVacancy;
