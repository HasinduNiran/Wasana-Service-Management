import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from '../../components/BackButton';
import img1 from '../../images/bg02.jpg';

const EditVacancy = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8077/vacancy/${id}`)
      .then((response) => {
        const data = response.data;
        setName(data.Name);
        setDescription(data.Description);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error happened. Please check the console.',
        });
        console.log(error);
      });
  }, [id]);

  const handleEditVacancy = () => {
    // Frontend validation
    if (!name || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    // Convert name to uppercase
    const uppercaseName = name.toUpperCase();

    // Proceed with editing Vacancy
    const data = {
      Name: uppercaseName,
      Description: description,
    };

    setLoading(true);

    axios
      .put(`http://localhost:8077/vacancy/${id}`, data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Vacancy data updated successfully!',
        }).then(() => {
          navigate('/vacancy');
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error happened. Please check the console.',
        });
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <div className="mar">
        <BackButton destination={`/vacancy`} />
      </div>

      <img
        src={img1}
        style={styles.image}
        alt="car"
      />

  
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2 style={styles.title}>Edit Vacancy</h2>

        <label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <button
          style={styles.submitButton}
          onClick={handleEditVacancy}
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
  error: {
    color: 'red',
    fontSize: '0.875rem',
  },
  image: {
    borderRadius: '30px',
    maxWidth: '240px',
    padding: '0px',
    height: '330px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
  
  },

};

export default EditVacancy;
