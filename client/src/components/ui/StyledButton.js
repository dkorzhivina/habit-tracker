import React from 'react';

const StyledButton = ({ children, primary, ...props }) => {
  const styles = {
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backgroundColor: primary ? '#4361ee' : '#f8f9fa',
      color: primary ? 'white' : '#212529',
      margin: '4px'
    }
  };

  return (
    <button style={styles.button} {...props}>
      {children}
    </button>
  );
};

export default StyledButton;
