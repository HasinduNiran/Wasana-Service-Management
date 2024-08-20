import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditStore = () => {
    const [Name, setName] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Price, setPrice] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8077/Store/${id}`)
            .then((response) => {
                const store = response.data;
                setName(store.Name);
                setQuantity(store.Quantity);
                setPrice(store.Price);
                setLoading(false);

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

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Name,
            Quantity,
            Price
            
        };
        setLoading(true);
        axios
        .put(`http://localhost:8077/Store/${id}`, data)
        .then(() => {
            setLoading(false);
            navigate('/Store'); // Navigate to /Employee after successful save
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
};


    return (
        <div>
            <h1>Edit</h1>
            <div>
                <form onSubmit={handleEditSubmit}>
                    <div>
                        <label style={labelStyle}>Name:</label>
                        <input type="text" id="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label style={labelStyle}>Quantity:</label>
                        <input type="number" id="Quantity" value={Quantity} onChange={(e) => setQuantity(e.target.value)} required />
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


export default EditStore