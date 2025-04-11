import React from 'react';
import '../styles/design-system.css';

const DesignWrapper = ({ children }) => {
  return (
    <div className="design-system">
      {children}
    </div>
  );
};

export default DesignWrapper;
