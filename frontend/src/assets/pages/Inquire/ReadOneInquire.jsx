import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <div>
      <h1>Show Inquiry</h1>
      <div>
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
         
        </div>
      </div>
    </div>
  );
};

export default ReadOneInquire