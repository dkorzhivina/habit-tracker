import React from 'react';

const StyledInput = ({ label, ...props }) => {
  const styles = {
    container: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '600',
      color: '#4361ee'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      fontSize: '16px'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#4361ee',
      boxShadow: '0 0 0 2px rgba(67, 97, 238, 0.2)'
    }
  };

  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input 
        style={styles.input}
        onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
        onBlur={(e) => e.target.style = styles.input}
        {...props}
      />
    </div>
  );
};

export default StyledInput;
