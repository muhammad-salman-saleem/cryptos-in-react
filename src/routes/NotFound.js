import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.text}>The page you are looking for might be in another castle. Click the button below to go back.</p>
      <Link to="/" style={styles.link}>
        Go Back
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    textAlign: 'center'
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '10px'
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px'
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease'
  }
};

export default NotFound;
