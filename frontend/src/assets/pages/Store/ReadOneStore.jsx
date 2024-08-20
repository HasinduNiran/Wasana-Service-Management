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

  const styles = {
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
    },
    value: {
      fontSize: '16px',
    },
    storeField: {
      marginBottom: '10px',
    },
  };
  return (
    <div>
      <h1>Show</h1>
      <div>
        <div>
          <div style={styles.storeField}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{store.Name}</span>
          </div>
          <div style={styles.storeField}>
            <span style={styles.label}>Quantity:</span>
            <span style={styles.value}>{store.Quantity}</span>
          </div>
          <div style={styles.storeField}>
            <span style={styles.label}>Price:</span>
            <span style={styles.value}>{store.Price}</span>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default ReadOneStore