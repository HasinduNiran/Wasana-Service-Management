import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadOneStore = () => {
    const [store, setStore] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8077/Store/${id}`)
            .then((response) => {
                setStore(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="container">
        <style>{`
            .container {
                max-width: 600px;
                position: center;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            
            .store-field {
                margin-bottom: 10px;
            }
            
            .label {
                font-weight: bold;
                margin-right: 10px;
            }
            
            .value {
                font-size: 16px;
                color: #555;
            }
        `}</style>
            <h1>Store Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="store-field">
                        <span className="label">Name:</span>
                        <span className="value">{store.Name}</span>
                    </div>
                    <div className="store-field">
                        <span className="label">Quantity:</span>
                        <span className="value">{store.Quantity}</span>
                    </div>
                    <div className="store-field">
                        <span className="label">Price:</span>
                        <span className="value">{store.Price}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReadOneStore;
