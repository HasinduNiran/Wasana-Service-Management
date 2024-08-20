import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateStore = () => {
    const [Name, setName] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Price, setPrice] = useState("");

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
            Quantity,
            Price
            
        };
        setLoading(true);
        try {
            await axios.post('http://localhost:8077/Store', data);
            setLoading(false);
            navigate('/Store');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Add</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={labelStyle}>Name:</label>
                        <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Quantity:</label>
                        <input type="date" id="Quantity" value={Quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Price:</label>
                        <input type="text" id="Price" value={Price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default CreateStore