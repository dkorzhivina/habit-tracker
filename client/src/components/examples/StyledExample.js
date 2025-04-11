import React from 'react';
import StyledContainer from '../ui/StyledContainer';
import StyledCard from '../ui/StyledCard';
import StyledButton from '../ui/StyledButton';
import StyledInput from '../ui/StyledInput';

const StyledExample = () => {
  return (
    <StyledContainer fullHeight>
      <StyledCard title="Design System Example">
        <StyledInput 
          label="Email Address"
          type="email"
          placeholder="Enter your email"
        />
        <StyledInput
          label="Password" 
          type="password"
          placeholder="Enter your password"
        />
        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
          <StyledButton primary>Submit</StyledButton>
          <StyledButton>Cancel</StyledButton>
        </div>
      </StyledCard>
    </StyledContainer>
  );
};

export default StyledExample;
