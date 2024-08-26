import { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const ReadOneApplicant = () => {
  const [applicant, setApplicant] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const { id } = useParams(); 

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`http://localhost:8077/applicant/${id}`) 
      .then((response) => {
        setApplicant(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!applicant) {
    return <p>Data is loading...</p>;
  }

  return (
    <div style={styles.container}>
      <BackButton destination={`/applicant/`} />
      <h1 style={styles.heading}>Show Applicant</h1>
      <div style={styles.applicantContainer}>
        <div style={styles.applicantInfo}>
          <div className="my-4">
            <span style={styles.label}>Applicant ID: </span>
            <span style={styles.value}>{applicant._id}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>First Name: </span>
            <span style={styles.value}>{applicant.FirstName}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Last Name: </span>
            <span style={styles.value}>{applicant.LastName}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Phone Number: </span>
            <span style={styles.value}>{applicant.Number}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Email: </span>
            <span style={styles.value}>{applicant.Email}</span>
          </div>
          <div className="my-4">
            <span style={styles.label}>Job Type: </span>
            <span style={styles.value}>{applicant.JobType}</span>
          </div>
          {applicant.image && (
            <div className="my-4">
              <span style={styles.label}>Image: </span>
              <img src={applicant.image} alt="Applicant" style={styles.image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
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
  applicantContainer: {
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
    backdropFilter: 'blur(100px)',
    opacity: '0.9',
  },
  applicantInfo: {
    margin: '0 auto',
    padding: '20px',
    width: '80%',
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
  image: {
    borderRadius: '10px',
    maxWidth: '200px',
    height: 'auto',
  },
};

export default ReadOneApplicant;
