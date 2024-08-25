import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../CSS/createVacancy.css";
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
          text: 'An error happened. Please check console.',
        });
        console.log(error);
      });
  }, [id]);

  const handleEditVacancy = () => {
    // Frontend validation
    const negativeFields = [];

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
          text: 'An error happened. Please check console.',
        });
        console.log(error);
      });
  };

  return (
   
    <div class="container">
      <div className="mar"><BackButton destination={`/vacancy`}/></div>
      
       < img src={img1}  style={{
    borderRadius: '30px',
    maxWidth: '240px',
    padding: '0px',
    height: '350px',
    borderTopRightRadius:'0px',
    borderBottomRightRadius :'0px',
  }}  alt="car" />  

{loading ? <Spinner /> : ''}
   <form  class="form">
      <h2 class="title">Edit Vacancy</h2>
    
      <label>
        <input type="text"
         placeholder = "Name" 
         value={name} 
         onChange={(e) => setName(e.target.value)}required />
      </label>
      <label>
        <input type="text" 
        placeholder = "Job Description"
         value={description}
         onChange={(e) => setDescription(e.target.value)}
        required />
      </label>
      
      <button class="submit"onClick={handleEditVacancy}>Submit</button>
      
   </form>
</div>
  );
};


export default EditVacancy;
