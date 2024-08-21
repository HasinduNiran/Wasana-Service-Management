import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateRepair = () => {
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [vehicleMake, setVehicleMake] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [repairDescription, setRepairDescription] = useState("");
    const [repairStatus, setRepairStatus] = useState("");
    const [Insuranceprovider, setInsuranceprovider] = useState("");
    const [Agent, setAgent] = useState("");

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
            customerName,
            customerEmail,
            customerPhone,
            vehicleMake,
            vehicleModel,
            vehicleNo,
            repairDescription,
            repairStatus,
            Insuranceprovider,
            Agent
        };
    
        // Simple client-side validation
        if (!customerName || !customerEmail || !customerPhone || !vehicleMake || !vehicleModel || !vehicleNo || !repairDescription || !repairStatus || !Insuranceprovider || !Agent) {
            alert("Please fill out all required fields.");
            return;
        }
    
        setLoading(true);
        try {
            await axios.post('http://localhost:8077/Repair', data);
            setLoading(false);
            navigate('/Repair');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.response?.data || error.message);
            alert('Failed to submit the form. Please check your inputs and try again.');
        }
    };
    
  return (
    <div className="container">
    <style>{`
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      h2 {
        color: #333;
        text-align: center;
        margin-bottom: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      label {
        margin-bottom: 5px;
        color: #555;
        font-weight: bold;
      }

      input[type="text"],
      input[type="number"],
      input[type="date"],
      input[type="email"] {
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        width: 100%;
      }

      button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        margin-top: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-size: 16px;
      }

      button:hover {
        background-color: #45a049;
      }

      @media screen and (max-width: 768px) {
        .container {
          padding: 10px;
        }

        input[type="text"],
        input[type="date"],
        input[type="email"] {
          padding: 8px;
          font-size: 14px;
        }

        button {
          padding: 8px 16px;
          font-size: 14px;
        }
      }
    `}</style>
        <h1>CreateRepair</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={labelStyle}>Customer Name:</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}required
                    />
                </div>
                <div>
                    <label style={labelStyle}>Customer Email:</label>
                    <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Customer Phone:</label>
                    <input
                        type="number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Vehicle Made :</label>
                    <input
                        type="text"
                        value={vehicleMake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Vehicle Model :</label>
                    <input
                        type="text"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Vehicle No :</label>
                    <input
                        type="text"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Description:</label>
                    <input
                        type="text"
                        value={repairDescription}
                        onChange={(e) => setRepairDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Repair Status:</label>
                    <input
                        type="text"
                        value={repairStatus}
                        onChange={(e) => setRepairStatus(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Insurance provider:</label>
                    <input
                        type="text"
                        value={Insuranceprovider}
                        onChange={(e) => setInsuranceprovider(e.target.value)}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Agent :</label>
                    <input
                        type="text"
                        value={Agent}
                        onChange={(e) => setAgent(e.target.value)}
                    />
                </div>
                <div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Save"}
                        </button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default CreateRepair