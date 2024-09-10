import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import img1 from "../../images/bg02.jpg";
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'

const EditBooking = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const [booking, setBooking] = useState({
    Booking_Date: "",
    Customer_Name: "",
    Vehicle_Type: "",
    Vehicle_Number: "",
    Contact_Number: "",
    Email: "",
    selectedPackage: "",
    selectedServices: [],
  });

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true); // Start loading when fetching booking
      try {
        const response = await axios.get(`http://localhost:8077/Booking/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error("There was an error fetching the booking details!", error);
      } finally {
        setLoading(false); // Stop loading after fetching booking
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      Booking_Date,
      Customer_Name,
      Contact_Number,
      Vehicle_Number,
    } = booking;

    const today = new Date().toISOString().split('T')[0];
    const vehicleNumberPattern = /^[A-Z]{1,3}\d{4}$/;
    const customerNamePattern = /^[A-Za-z\s]+$/;
    const contactNumberPattern = /^0\d{9}$/;

    if (Booking_Date < today) {
      Swal.fire('Error', 'Booking date must be today or a future date.', 'error');
      return false;
    }

    if (!customerNamePattern.test(Customer_Name)) {
      Swal.fire('Error', 'Customer name cannot contain numbers or special characters.', 'error');
      return false;
    }

    if (!contactNumberPattern.test(Contact_Number)) {
      Swal.fire('Error', 'Contact number must be a 10-digit number starting with 0.', 'error');
      return false;
    }

    if (!vehicleNumberPattern.test(Vehicle_Number)) {
      Swal.fire('Error', 'Vehicle number must start with 1-3 letters followed by 4 digits.', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start loading when submitting the form
    try {
      await axios.put(`http://localhost:8077/Booking/${id}`, booking);
      Swal.fire('Success', 'Booking updated successfully!', 'success');
      navigate("/Booking"); // Redirect to the bookings list after updating
    } catch (error) {
      console.error("There was an error updating the booking!", error);
      Swal.fire('Error', 'Failed to update booking. Please try again.', 'error');
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message when loading
  }

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: '"Noto Sans", sans-serif',
    },
    backButton: {
      marginBottom: "50%",
      marginLeft: "-80%",
      position: "absolute",
    },
    image: {
      borderRadius: "30px",
      maxWidth: "240px",
      padding: "0px",
      height: "585px",
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
    },
    form: {
      borderRadius: "30px",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      maxWidth: "450px",
      padding: "20px",
      height: "auto",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    },
    title: {
      color: "#6c1c1d",
      fontSize: "30px",
      fontWeight: "600",
      paddingLeft: "30px",
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    input: {
      backgroundColor: "#333",
      color: "#fff",
      border: "1px solid rgba(105, 105, 105, 0.397)",
      borderRadius: "10px",
      fontSize: "1rem",
      padding: "15px 8px",
      outline: "0",
      width: "100%",
      marginTop: "20px",
      marginBottom: "20px",
    },
    flex: {
      display: "flex",
      gap: "8px",
      marginTop: "15px",
    },
    submitButton: {
      border: "none",
      backgroundColor: "#6c1c1d",
      marginTop: "10px",
      outline: "none",
      padding: "10px",
      borderRadius: "10px",
      color: "#fff",
      fontSize: "16px",
      width: "100%",
      cursor: "pointer",
    },
    submitButtonHover: {
      backgroundColor: "#661003f5",
    },
  };

  return (
<div className=""><Navbar/>
    <div style={styles.container}>
     
      <img src={img1} style={styles.image} alt="car" />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Booking</h2>
        <div style={styles.flex}>
          <input
            type="date"
            name="Booking_Date"
            placeholder="Booking Date"
            value={booking.Booking_Date}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="Customer_Name"
            placeholder="Customer Name"
            value={booking.Customer_Name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.flex}>
          <input
            type="text"
            name="Vehicle_Type"
            placeholder="Vehicle Type"
            value={booking.Vehicle_Type}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="Vehicle_Number"
            placeholder="Vehicle Number"
            value={booking.Vehicle_Number}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.flex}>
          <input
            type="text"
            name="Contact_Number"
            placeholder="Contact Number"
            value={booking.Contact_Number}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={booking.Email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.flex}>
          <input
            type="text"
            name="selectedPackage"
            placeholder="Package"
            value={booking.selectedPackage}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="selectedServices"
            placeholder="Services"
            value={booking.selectedServices}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.submitButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.submitButton.backgroundColor)
          }
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default EditBooking;
