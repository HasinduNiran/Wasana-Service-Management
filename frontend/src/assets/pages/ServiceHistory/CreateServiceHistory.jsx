import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import img1 from '../../images/bg02.jpg';
import BackButton from '../../components/BackButton';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';

function CreateServiceHistory() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]); // Add this line

    const [selectedServices, setSelectedServices] = useState([]);
    const [services, setServices] = useState([]);
    const [promotion, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get("http://localhost:8077/Promotion");
                setPackages(response.data);
            } catch (error) {
                setError("Failed to fetch promotions.");
                console.error("Error fetching promotions", error);
            }
        };
        fetchPromotions();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8077/Employee');
                setEmployees(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8077/service");
                setServices(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8077/Booking');
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings!", error);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setService(prev => ({
                ...prev,
                selectedServices: checked
                    ? [...prev.selectedServices, value]
                    : prev.selectedServices.filter(item => item !== value),
            }));
        } else {
            setService(prev => ({ ...prev, [name]: value }));

            if (name === 'Milage') {
                const milage = parseInt(value, 10) || 0;
                setService(prev => ({ ...prev, nextService: milage + 5000 }));
            }
        }
    };

    const handleBookingSelect = (e) => {
        const selectedBookingId = e.target.value;
        const selectedBooking = bookings.find(booking => booking.Booking_Id === selectedBookingId);

        if (selectedBooking) {
            setService(prev => ({
                ...prev,
                Booking_Id: selectedBookingId,
                Customer_Name: selectedBooking.Customer_Name,
                Customer_Email: selectedBooking.Email,
                // Allocated_Employee: selectedBooking.Allocated_Employee,
                Vehicle_Number: selectedBooking.Vehicle_Number,
                Milage: selectedBooking.Milage,
                Package: selectedBooking.selectedPackage,
                selectedServices: selectedBooking.selectedServices || [],
                nextService: parseInt(selectedBooking.Milage, 10) + 5000,
            }));
        }
    };


    const handlePackageChange = (e) => {
        const selectedPackage = e.target.value;
        setService(prev => ({ ...prev, Package: selectedPackage }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(service.Customer_Name)) {
            setLoading(false);
            setError('Customer name cannot contain numbers or special characters.');
            return;
        }

        axios.post('http://localhost:8077/ServiceHistory', service)
            .then(response => {
                console.log('Service history created:', response.data);
                navigate('/ServiceHistory');
            })
            .catch(error => {
                console.error('Error creating service history:', error);
                setError('Error creating service history.');
                setLoading(false);
            });
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div className="mar">
                    <BackButton destination="/ServiceHistory" />
                </div>
                <img src={img1} style={styles.image} alt="background" />
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2 style={styles.title}>Add Service History</h2>

                    <label>
                        <select
                            name="Booking_Id"
                            value={service.Booking_Id}
                            onChange={handleBookingSelect}
                            required
                            style={styles.input}
                        >
                            <option value="">Select Booking ID</option>
                            {bookings.map(booking => (
                                <option key={booking._id} value={booking.Booking_Id}>
                                    {booking.Booking_Id}
                                </option>
                            ))}
                        </select>
                    </label>

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
                        <label>Package</label>
                        <select
                            name="Package"
                            value={service.Package}
                            onChange={handlePackageChange}
                            style={styles.input}
                        >
                            <option value="">Select Package</option>
                            {promotion.map(promotion => (
                                <option key={promotion._id} value={promotion.title}>
                                    {promotion.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label>
                        <input
                            type="text"
                            name="nextService"
                            placeholder="Next Service"
                            value={service.nextService}
                            readOnly
                            style={styles.input}
                        />
                    </label>

                    <div style={{ marginTop: "20px" }}>
                        <label style={{ fontSize: "18px", marginBottom: "10px" }}>Includes:</label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                            {services.map(serviceItem => (
                                <div key={serviceItem._id} style={{ flex: "1 1 45%" }}>
                                    <input
                                        type="checkbox"
                                        id={serviceItem._id}
                                        name="selectedServices"
                                        value={serviceItem.Servicename}
                                        checked={service.selectedServices.includes(serviceItem.Servicename)}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={serviceItem._id} style={{ marginLeft: "10px" }}>
                                        {serviceItem.Servicename} (${serviceItem.Price})
                                    </label>
                                </div>
                            ))}
                        </div>
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

export default CreateServiceHistory;
