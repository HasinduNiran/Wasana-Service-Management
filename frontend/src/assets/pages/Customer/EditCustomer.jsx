import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const [firstName, setFirstName] = useState("");
  // const [image, setImage] = useState(null);
  const [cusID, setCusID] = useState("");
  const [lastName, setLastName] = useState("");
  const [NIC, setNIC] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8077/Customer/${id}`)
      .then((response) => {
        const Customer = response.data;
        setCusID(Customer.cusID);
        setNIC(Customer.NIC);
        setFirstName(Customer.firstName);
        setLastName(Customer.lastName);
        setPhone(Customer.phone);
        setEmail(Customer.email);
        setPassword(Customer.password);
        setReEnteredPassword(Customer.password);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    const data = {
      cusID,
      firstName,
      lastName,
      NIC,
      phone,
      email,
      password,
    };
    setLoading(true);
    try {
      await axios.put(`http://localhost:8077/Customer/${id}`, data);
      setLoading(false);
      navigate("/Customer");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
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
      <h1>Edit Profile</h1>
      <div>
        <form onSubmit={handleEditCustomer}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={cusID}
              onChange={(e) => setCusID(e.target.value)}
              //   style={styles.input}
              maxLength={10}
              required={true}
              readOnly
            />
          </div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              //   style={styles.input}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              //   style={styles.input}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              //   style={styles.input}
              maxLength={10}
            />
          </div>
          <div>
            <label>NIC</label>
            <input
              type="text"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              //   style={styles.input}
              maxLength={12}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              //   style={styles.input}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   style={styles.input}
            />
          </div>
          <div>
            <label>Re-enter Password</label>
            <input
              type="password"
              value={reEnteredPassword}
              onChange={(e) => setReEnteredPassword(e.target.value)}
              //   style={styles.input}
            />
          </div>
          <div>
            <button type="submit">Save</button>{" "}
            {/* Use type="submit" to trigger form submission */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
