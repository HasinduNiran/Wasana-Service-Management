import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadOneRepair = () => {
  const [repair, setRepair] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8077/Repair/${id}`)
      .then((response) => {
        setRepair(response.data);
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
    RepairField: {
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
      <h1>Show Repair</h1>
      <div>
        <div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{repair.customerName}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{repair.customerEmail}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Phone:</span>
            <span style={styles.value}>{repair.customerPhone}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Made:</span>
            <span style={styles.value}>{repair.vehicleMake}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Model:</span>
            <span style={styles.value}>{repair.vehicleModel}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Vehicle No:</span>
            <span style={styles.value}>{repair.vehicleNo}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Description:</span>
            <span style={styles.value}>{repair.repairDescription}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Status:</span>
            <span style={styles.value}>{repair.repairStatus}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Insurance Provider:</span>
            <span style={styles.value}>{repair.Insuranceprovider}</span>
          </div>
          <div style={styles.RepairField}>
            <span style={styles.label}>Agent:</span>
            <span style={styles.value}>{repair.Agent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOneRepair