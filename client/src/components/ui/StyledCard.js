import React from 'react';

const StyledCard = ({ children, title }) => {
  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '20px',
      marginBottom: '20px'
    },
    title: {
      color: '#4361ee',
      marginBottom: '15px'
    }
  };

  return (
    <div style={styles.card}>
      {title && <h3 style={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};

export default StyledCard;
