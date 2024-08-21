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