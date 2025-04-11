import React from 'react';
import '../styles/design-system.css';
import DesignWrapper from '../components/DesignWrapper';

const DesignTestPage = () => {
  return (
    <DesignWrapper>
      <div className="container">
        <h1>Design System Verification</h1>
        <div className="card">
          <h2>Components Test</h2>
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn" style={{marginLeft: '10px'}}>Secondary Button</button>
          <div style={{marginTop: '20px'}}>
            <input type="text" className="form-control" placeholder="Test input field" />
          </div>
        </div>
      </div>
    </DesignWrapper>
  );
};

export default DesignTestPage;
