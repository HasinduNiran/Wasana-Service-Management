import { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { useParams, Link, useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner';
//import backgroundImage from '../../images/t.jpg';

const ReadOneVacancy = () => {
  // State initialization
  const [vacancy, setVacancy] = useState(null); // State to store the vacancy data
  const [loading, setLoading] = useState(false); // State to track the loading status
  const { id } = useParams(); // Extracting the vacancy ID from the URL parameters

  // Fetch the vacancy data when the component mounts or when 'id' changes
  useEffect(() => {
    setLoading(true); // Set loading to true while fetching data
    axios
      .get(`http://localhost:8077/vacancy/${id}`) // API call to fetch vacancy data by ID
      .then((response) => {
        setVacancy(response.data); // Set the fetched data to state
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Stop loading if there's an error
      });
  }, [id]);


  // If the data is still loading, show a spinner
  if (loading) {
    return <Spinner />;
  }

  // If the inventory data hasn't loaded yet, show a loading message
  if (!inventory) {
    return <p>Data is loading...</p>;
  }

  return (
    <div style={styles.container}>
      <BackButton destination={`/inventory/InventoryDashboard`} />
      <h1 style={styles.heading}>Show Inventory</h1>
      <div style={styles.vehicleContainer}>
        <div style={styles.vehicleInfo}>
          <div className="my-4">
            <span style={styles.label}>Item Number</span>
            <span style={styles.value}>{inventory._id}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Name</span>
            <span style={styles.value}>{vacancy.Name}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Description</span>
            <span style={styles.value}>{vacancy.description}</span>
          </div>


        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    //backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#fff',
  },
  subHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: '10px',
    display: 'block',
    textTransform: 'uppercase',
  },
  vehicleContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 4, 0.6)',
    borderRadius: '10px',
    backgroundColor: 'rgba(5, 4, 2, 0.8)',
    padding: '20px',
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backdropFilter: 'blur(100px)', // Adjust the blur effect here
    opacity: '0.9', // Adjust the opacity here
  },
  vehicleInfo: {
    margin: '0 auto',
    padding: '20px',
    width: '80%',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  label: {
    fontWeight: 'bold',
    color: 'red',
    width: '100%',
    padding: '1px',
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
  },
  serviceHistory: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    background: '#333',
    color: 'red',
    textAlign: 'center',
    border: '1px solid red',
  },
  tableHeader: {
    padding: '10px',
    textAlign: 'left',
    color: 'red',
    border: '1px solid red',
  },
  tableRowEven: {
    background: '#2f2f2f',
  },
  tableRowOdd: {
    background: '#1f1f1f',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    border: '1px solid red',
  },
};


export default ReadOneVacancy;
