import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditInquire = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Number, setNumber] = useState("");
  const [ServiceType, setServiceType] = useState("");
  const [Message, setMessage] = useState("");
  const [VehicleNumber, setVehicleNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8077/Inquire/${id}`)
        .then((response) => {
          const Inquire = response.data;
          setName(Inquire.Name);
          setEmail(Inquire.Email);
          setNumber(Inquire.Number);
          setServiceType(Inquire.ServiceType);
          setMessage(Inquire.Message);
          setVehicleNumber(Inquire.VehicleNumber);
        }).catch((error) => {
          console.error('Error:', error);
          setLoading(false);
      });
}, [id]);
const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};
const handleEditInquire = (e) => {
  e.preventDefault(); // Prevent default form submission
  const data = {
      Name,
      Email,
      Number,
      ServiceType,
      Message,
      VehicleNumber
  };
  setLoading(true);
  axios
      .put(`http://localhost:8077/Inquire/${id}`, data)
      .then(() => {
          setLoading(false);
          navigate('/Inquire'); // Navigate to /Employee after successful save
      })
      .catch((error) => {
          setLoading(false);
          console.log(error);
      });
};

  return (
    <div>
    <h1>Edit Inquire</h1>
    <div>
        <form onSubmit={handleEditInquire}>
            <div>
                <label style={labelStyle}> Name:</label>
                <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} required 
                readOnly/>
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
                    {loading ? "Loading..." : "Edit Inquiry"}
                </button>
            </div>
        </form>
    </div>
</div>
);
}


export default EditInquire