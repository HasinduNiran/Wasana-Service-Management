import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";
import img1 from "../../images/bg02.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

function CreateFeedback() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    cusID: "",
    name: "",
    email: "",
    phone_number: "",
    employee: "",
    message: "",
    star_rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { phone_number, name } = feedback;

    const phoneNumberRegex = /^0\d{9}$/; // 10 digits, starting with 0
    const nameRegex = /^[A-Za-z\s]+$/; // Name with only letters and spaces allowed

    if (!phoneNumberRegex.test(phone_number)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must contain exactly 10 digits and start with 0.",
      });
      return false;
    }

    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name cannot contain numbers or special characters.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    setLoading(true);

    axios
      .post("http://localhost:8077/feedback", feedback)
      .then((response) => {
        console.log("Feedback created:", response.data);
        navigate(`/ReadOneHome/${cusID}`);
      })
      .catch((error) => {
        console.error("Error creating feedback:", error);
        setError("Error creating feedback.");
        setLoading(false);
      });
  };

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
      height: "620px",
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
    <div className="">
      <Navbar />
      <div style={styles.container}>
        <BackButton destination={`/`} style={styles.backButton} />
        <img src={img1} style={styles.image} alt="car" />
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Create Feedback</h2>
          <div style={styles.flex}>
            <input
              type="text"
              name="cusID"
              placeholder="Customer ID"
              value={feedback.cusID}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={feedback.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.flex}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={feedback.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={feedback.phone_number}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.flex}>
            <input
              type="text"
              name="employee"
              placeholder="Employee"
              value={feedback.employee}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="number"
              name="star_rating"
              value={feedback.star_rating}
              onChange={handleChange}
              placeholder="Star Rating"
              required
              style={styles.input}
              min="0"
              max="5"
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={feedback.message}
            onChange={handleChange}
            required
            style={{ ...styles.input, height: "100px" }}
          />
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreateFeedback;
