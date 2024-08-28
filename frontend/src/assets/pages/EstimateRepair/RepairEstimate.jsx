import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

const RepairEstimate = () => {
    const [estimate, setEstimate] = useState({
        name: "",
        amount: "",
      });
    const [estList, setEstList] = useState([]);  
    
      const navigate = useNavigate(); // Initialize useNavigate
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEstimate((prevEstimate) => ({
          ...prevEstimate,
          [name]: value,
        }));
        
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setEstList((prevList) => ({
            ...prevList
        }))
        try {
            console.log(estList)
        } catch (error) {
          console.error("There was an error creating the promotion!", error);
          alert("Failed to create promotion. Please try again.");
        }
      };
    
  return (
    <div  >
        
            <h2 >Create Promotion</h2>
            <input
            type="text"
            placeholder="Title"
            name="name"
            value={estimate.name}
            onChange={handleChange}
            required
          
            />
            <input
            type="text"
            placeholder="Description"
            name="amount"
            value={estimate.amount}
            onChange={handleChange}
            required
            
            />
            
            <button
            type="submit"
            onClick={handleSubmit}
            >
            Submit
            </button>
        
    </div>
  )
}

export default RepairEstimate