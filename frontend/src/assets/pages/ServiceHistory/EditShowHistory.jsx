import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import img1 from '../../images/bg02.jpg';
import BackButton from '../../components/BackButton';
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'

function EditShowHistory() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [service, setService] = useState({
        cusID: '',
        Customer_Name: '',
        Customer_Email: '',
        Allocated_Employee: '',
        Vehicle_Number: '',
        Service_History: '',
        Service_Date: '',
        Milage: '',
        Package: '',
        selectedServices: [],
        Booking_Id: '',
        nextService: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:8077/ServiceHistory/${id}`);
                setService(response.data);
            } catch (err) {
                console.error('Error fetching service history:', err);
                setError('Error fetching service history.');
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8077/ServiceHistory/${id}`, service);
            navigate('/ServiceHistory'); // Redirect to service history list page
        } catch (err) {
            console.error('Error updating service history:', err);
            setError('Error updating service history.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="">
            <Navbar />
            <div style={styles.container}>
                <div className="mar">
                    <BackButton destination="/ServiceHistory" />
                </div>
                {/* Ensure img1 is defined or replace with another image */}
                <img src={img1} style={styles.image} alt="background" />
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2 style={styles.title}>Edit Service History</h2>
                    <div style={styles.flex}>
                        <label>
                            <input
                                type="text"
                                name="Customer_Name"
                                placeholder="Customer Name"
                                value={service.Customer_Name}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                        <label>
                            <input
                                type="email"
                                name="Customer_Email"
                                placeholder="Customer Email"
                                value={service.Customer_Email}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                    </div>
                    <div style={styles.flex}>
                        <label>
                            <input
                                type="text"
                                name="Allocated_Employee"
                                placeholder="Allocated Employee"
                                value={service.Allocated_Employee}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                name="Vehicle_Number"
                                placeholder="Vehicle Number"
                                value={service.Vehicle_Number}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                    </div>
                    <div style={styles.flex}>
                        <label>
                            <input
                                type="text"
                                name="Service_History"
                                placeholder="Service History"
                                value={service.Service_History}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                        <label>
                            <input
                                type="date"
                                name="Service_Date"
                                placeholder="Service Date"
                                value={service.Service_Date}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                    </div>
                    <div style={styles.flex}>
                        <label>
                            <input
                                type="number"
                                name="Milage"
                                placeholder="Mileage"
                                value={service.Milage}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                        <label>
                            <input
                                type="text"
                                name="Package"
                                placeholder="Package"
                                value={service.Package}
                                onChange={handleChange}
                                required
                                style={styles.input}
                            />
                        </label>
                    </div>
                    <button type="submit" style={styles.submitButton}>
                        Submit
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: '"Noto Sans", sans-serif',
    },
    form: {
        borderRadius: '30px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        maxWidth: '360px',
        padding: '20px',
        height: 'auto',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
    },
    title: {
        color: '#6c1c1d',
        fontSize: '30px',
        fontWeight: '600',
        paddingLeft: '30px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        border: '1px solid rgba(105, 105, 105, 0.397)',
        borderRadius: '10px',
        fontSize: '1rem',
        padding: '15px 8px',
        outline: '0',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
    },
    submitButton: {
        border: 'none',
        backgroundColor: '#6c1c1d',
        marginTop: '10px',
        outline: 'none',
        padding: '10px',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '16px',
        width: '100%',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '0.875rem',
    },
    image: {
        borderRadius: '30px',
        maxWidth: '240px',
        padding: '0px',
        height: '585px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
    },
    flex: {
        display: 'flex',
        gap: '8px',
        marginTop: '15px',
    },
};

export default EditShowHistory;
