import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import emailjs

const ReadOneInquire = () => {
  const [inquire, setInquire] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8077/Inquire/${id}`)
      .then((response) => {
        setInquire(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const sendEmail = () => {
    const emailConfig = {
      serviceID: 'service_p1zv9rh',
      templateID: 'template_pua7ayd',
      userID: 'v53cNBlrti0pL_RxD'
    };

    emailjs.send(
      emailConfig.serviceID,
      emailConfig.templateID,
      {
        to_email: inquire.Email, // Use the fetched email
        message: `Dear ${inquire.Name},\n\nWe have received your inquiry regarding ${inquire.ServiceType}.\n\n\n\n\n\n We will get back to you soon.\n\nBest regards,\nYour Company Name`
      },
      emailConfig.userID
    ).then(() => {
      alert('Email sent successfully!');
    }).catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    });
  };

  const styles = {
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
    },
    value: {
      fontSize: '16px',
    },
    inquireField: {
      marginBottom: '10px',
    },
  };

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
      <h1>Show Inquiry</h1>
      <div>
        <div style={styles.inquireField}>
          <span style={styles.label}>Name:</span>
          <span style={styles.value}>{inquire.Name}</span>
        </div>
        <div style={styles.inquireField}>
          <span style={styles.label}>Number:</span>
          <span style={styles.value}>{inquire.Number}</span>
        </div>
        <div style={styles.inquireField}>
          <span style={styles.label}>Email:</span>
          <span style={styles.value}>{inquire.Email}</span>
        </div>
        <div style={styles.inquireField}>
          <span style={styles.label}>Service Type:</span>
          <span style={styles.value}>{inquire.ServiceType}</span>
        </div>
        <div style={styles.inquireField}>
          <span style={styles.label}>Vehicle Number:</span>
          <span style={styles.value}>{inquire.VehicleNumber}</span>
        </div>
        <div style={styles.inquireField}>
          <span style={styles.label}>Message:</span>
          <span style={styles.value}>{inquire.Message}</span>
        </div>
        <button onClick={sendEmail} className="btn btn-primary">Send Email</button> {/* Add button to send email */}
      </div>
    </div>
  );
};

export default ReadOneInquire;
