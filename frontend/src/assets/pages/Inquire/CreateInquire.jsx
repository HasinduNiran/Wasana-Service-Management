import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import img1 from '../../images/bg02.jpg';

const CreateInquire = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Number, setNumber] = useState("");
  const [ServiceType, setServiceType] = useState("");
  const [Message, setMessage] = useState("");
  const [VehicleNumber, setVehicleNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Name,
      Email,
      Number,
      ServiceType,
      Message,
      VehicleNumber,
    };
    setLoading(true);
    try {
      await axios.post("http://localhost:8077/Inquire", data);
      setLoading(false);
      navigate("/Inquire");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
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
      height: "632px",
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
    <div style={styles.container}>
      <div style={styles.backButton}>
        <BackButton destination="/vacancy" />
      </div>
      <img src={img1} style={styles.image} alt="car" />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Inquire</h2>

        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          value={Email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <div style={styles.flex}>
          <input
            type="text"
            placeholder="Number"
            value={Number}
            onChange={(e) => setNumber(e.target.value)}
            required
            style={styles.input}
          />
          <div>
            <select
              value={ServiceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
              style={styles.input}
            >
              <option value="" disabled>Select Service Type</option>
              <option value="Service1">Vehicle Service</option>
              <option value="Service2">Vehicle Repair</option>
              <option value="Service3">Modification</option>
              <option value="Service3">Others</option>
             
            </select>
          </div>

        </div>
        <input
          type="text"
          placeholder="Message"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Vehicle Number"
          value={VehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
          style={styles.input}
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
      </form>
    </div>
  );
};

export default CreateInquire;
