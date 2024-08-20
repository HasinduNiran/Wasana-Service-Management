import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateInquire = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Number, setNumber] = useState("");
  const [ServiceType, setServiceType] = useState("");
  const [Message, setMessage] = useState("");
  const [VehicleNumber, setVehicleNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
        Name,
        Email,
        Number,
        ServiceType,
        Message,
        VehicleNumber,
      };
      setLoading(true);
        try {
            await axios.post('http://localhost:8077/Inquire', data);
            setLoading(false);
            navigate('/Inquire');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };
    
  return (
    <div>
    <h1>Create Inquire</h1>
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label style={labelStyle}> Name:</label>
                <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label style={labelStyle}>Number</label>
                <input type="text" id="Number" value={Number} onChange={(e) => setNumber(e.target.value)} required />
            </div>
            <div>
                <label style={labelStyle}>Email:</label>
                <input type="email" id="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />            </div>
            <div>
                <label style={labelStyle}>Service Type:</label>
                <input type="text" id="ServiceType" value={ServiceType} onChange={(e) => setServiceType(e.target.value)} required />
            </div>
            <div>
                <label style={labelStyle}>Vehicle Number :</label>
                <input type="text" id="VehicleNumber" value={VehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />
            </div>
            <div>
                <label style={labelStyle}>Message:</label>
                <input type="text area" id="Message" value={Message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            
            <div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Create Inquiry"}
                </button>
            </div>
        </form>
    </div>
</div>
);
}

export default CreateInquire