import React from 'react';

const SubmitButton = ({ 
  children, 
  primary,
  onClick,
  type = 'button',
  style,
  ...props 
}) => {
  const baseStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    backgroundColor: primary === 'true' ? '#4361ee' : '#f8f9fa',
    color: primary === 'true' ? 'white' : '#212529',
    margin: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    ...style
  };

  return (
    <button 
      style={baseStyle} 
      onClick={onClick} 
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
