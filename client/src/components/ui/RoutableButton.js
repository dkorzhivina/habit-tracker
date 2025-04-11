import React from 'react';
import { Link } from 'react-router-dom';

const RoutableButton = ({ 
  children, 
  primary, 
  to, 
  onClick, 
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
    backgroundColor: primary ? '#4361ee' : '#f8f9fa',
    color: primary ? 'white' : '#212529',
    margin: '4px',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    ...style
  };

  if (to) {
    return (
      <Link to={to} style={baseStyle} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button style={baseStyle} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default RoutableButton;
