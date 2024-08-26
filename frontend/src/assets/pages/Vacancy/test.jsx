import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    Booking_Date: "",
    Customer_Name: "",
    Vehicle_Type: "",
    Vehicle_Number: "",
    Contact_Number: "",
    Email: "",
    selectedPackage: "",
    selectedServices: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8077/Booking", booking);
      alert("Booking created successfully!");
      navigate("/Booking"); // Redirect to the bookings list after creation
    } catch (error) {
      console.error("There was an error creating the booking!", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div class="container">
            <div className="mar"><BackButton destination={`/vacancy`}/></div>
            < img src={img1}  style={{
    borderRadius: '30px',
    maxWidth: '240px',
    padding: '0px',
    height: '632px',
    borderTopRightRadius:'0px',
    borderBottomRightRadius :'0px',
  }}  alt="car" /> 
    <form action="#" class="form">
    {loading ? <Spinner /> : ''}
       <h2 class="title">Add Applicant</h2>
       <p class="title-message">Signup now and get full access to our app.</p>
       <div class="flex">
         <label>
           <input type="text" 
           placeholder = "First Name"
           value={firstName}
           onChange={(e) => setFirstName(e.target.value)}
            required />
         </label>
         <label>
           <input type="text" 
           placeholder = "Last Name" 
           value={lastName}
           onChange={(e) => setLastName(e.target.value)}
           required />
         </label>
       </div>
       <label>
         <input type="email" 
         placeholder = "Email" 
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required />
       </label>
       <label>
         <input type="number" 
         placeholder = "Phone Number" 
         value={number}
         onChange={(e) => setNumber(e.target.value)}
         required />
       </label>
       <label>
         <input type="password" 
         placeholder = "Job Type"
         value={jobType}
         onChange={(e) => setJobType(e.target.value)}
         required />
       </label>
       <label>
         <input type="text"
          placeholder = "Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
           required />
       </label>
       <button class="submit"onClick={handleEditApplicant}>Submit</button>
       
    </form>
 </div>
  );
};

export default CreateBooking;
