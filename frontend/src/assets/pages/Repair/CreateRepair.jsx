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
        setLoading(true);
        try {
            await axios.post('http://localhost:8077/Repair', data);
            setLoading(false);
            navigate('/Repair');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

  return (
    <div>
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