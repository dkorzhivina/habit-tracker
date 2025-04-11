import React from 'react';

const StyledContainer = ({ children, fullHeight }) => {
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      minHeight: fullHeight ? '100vh' : 'auto',
      backgroundColor: '#f8f9fa'
    }
  };

  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

export default StyledContainer;
