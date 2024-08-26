import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import Swal from 'sweetalert2';
import BackButton from '../../components/BackButton';
import img1 from '../../images/bg02.jpg';


export const CreateVehicle = () => {
  const [cusID, setCusID] = useState('');
  const [Register_Number, setRegister_Number] = useState('');
  const [Make, setMake] = useState('');
  const [Model, setModel] = useState('');
  const [Year, setYear] = useState('');
  const [Engine_Details, setEngine_Details] = useState('');
  const [Transmission_Details, setTransmission_Details] = useState('');
  const [Vehicle_Color, setVehicle_Color] = useState('');
  const [Vehicle_Features, setVehicle_Features] = useState('');
  const [Condition_Assessment, setCondition_Assessment] = useState('');
  const [Owner, setOwner] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const storage = getStorage(app);

  const validateVehicleNumber = (value) => {
    const regex = /^[a-zA-Z0-9\s-]{0,4}[0-9]{4}$/;
    return regex.test(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateVehicleNumber(Register_Number)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Vehicle Number',
        text: 'Please enter a valid vehicle number.',
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl = '';
      if (image) {
        const storageRef = ref(storage, `vehicleImages/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Error uploading image to Firebase:', error);
            Swal.fire({
              icon: 'error',
              title: 'Upload Error',
              text: `Failed to upload file: ${error.message}`,
            });
            createVehicle(imageUrl);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              imageUrl = downloadURL;
              createVehicle(imageUrl);
            });
          }
        );
      } else {
        createVehicle(imageUrl); // Proceed without image
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating vehicle:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error creating vehicle. Please try again.',
      });
    }
  };

  const createVehicle = (imageUrl) => {
    const data = {
      cusID,
      Register_Number,
      Make,
      Model,
      Year,
      Engine_Details,
      Transmission_Details,
      Vehicle_Color,
      Vehicle_Features,
      Condition_Assessment,
      Owner,
      image: imageUrl,
    };

    axios.post('http://localhost:8077/Vehicle', data)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vehicle created successfully.',
          });
          navigate('/vehicles');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create vehicle.',
          });
        }
      })
      .catch(err => {
        setLoading(false);
        console.error('Error creating vehicle:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the vehicle. Please try again.',
        });
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
      height: "850px",
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
    
    <div style={styles.container}>
      <div style={styles.mar}>
        <BackButton destination={`/vacancy`} />
      </div>
      <img
        src={img1}
        style={styles.image}
        alt="car"
      />
      <form onSubmit={handleSubmit} style={styles.form}>
        
        <h2 style={styles.title}>Add Vehicle</h2>
        <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="Customer ID"
              value={cusID}
              onChange={(e) => setCusID(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Register Number"
              value={Register_Number}
              onChange={(e) => setRegister_Number(e.target.value.toUpperCase())}
            maxLength={8}
              required
              style={styles.input}
            />
          </label>
          </div>
          <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="Make"
              value={Make}
              onChange={(e) => setMake(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Model"
              value={Model}
              onChange={(e) => setModel(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          </div>
          <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="Year"
              value={Year}
              onChange={(e) => setYear(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Engine Details"
              value={Engine_Details}
              onChange={(e) => setEngine_Details(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          </div>
          <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="Transmission Details"
              value={Transmission_Details}
              onChange={(e) => setTransmission_Details(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Vehicle Color"
              value={Vehicle_Color}
              onChange={(e) => setVehicle_Color(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          </div>
          <div style={styles.flex}>
          <label>
            <input
              type="text"
              placeholder="Vehicle Features"
              value={Vehicle_Features}
              onChange={(e) => setVehicle_Features(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Condition Assessment"
              value={Condition_Assessment}
              onChange={(e) => setCondition_Assessment(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          </div>
          
          <label>
            <input
              type="text"
              placeholder="Owner"
              value={Owner}
              onChange={(e) => setOwner(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <div className="flex flex-col">
          <label className="mb-2 font-semibold">Vehicle Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="p-0 border border-gray-600 rounded-lg"
          />
        </div>
      
        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#661003f5'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c1c1d'}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
