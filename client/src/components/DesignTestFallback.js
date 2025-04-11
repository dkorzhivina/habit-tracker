import React from 'react';

const DesignTestFallback = () => {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    heading: {
      color: '#4361ee',
      marginBottom: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '20px',
      marginBottom: '20px'
    },
    buttonPrimary: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#4361ee',
      color: 'white',
      fontWeight: '600',
      marginRight: '10px',
      cursor: 'pointer'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginTop: '20px',
      maxWidth: '300px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Design System Test (Fallback)</h1>
        
        <div style={styles.card}>
          <h2>Card Component</h2>
          <p>This should have shadow and rounded corners</p>
        </div>

        <div>
          <button style={styles.buttonPrimary}>
            Primary Button
          </button>
        </div>

        <div>
          <input 
            type="text" 
            style={styles.input}
            placeholder="Test input field" 
          />
        </div>
      </div>
    </div>
  );
};

export default DesignTestFallback;
