import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.85); opacity: 0.5; }
  50% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(0.85); opacity: 0.5; }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${({ fullscreen }) => (fullscreen ? '100vh' : '200px')};
  background: ${({ theme, fullscreen }) => (fullscreen ? theme.backgroundColor : 'transparent')};
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid ${({ theme }) => theme.borderColor};
  border-top: 4px solid ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const InnerSpinner = styled(Spinner)`
  width: 65%;
  height: 65%;
  top: 17.5%;
  left: 17.5%;
  border-top-color: ${({ theme }) => theme.secondaryColor};
  animation: ${spin} 1s linear infinite reverse;
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ size = 50, text = 'Loading...', fullscreen = false }) => (
  <SpinnerWrapper fullscreen={fullscreen}>
    <SpinnerContainer size={size}>
      <Spinner />
      <InnerSpinner />
    </SpinnerContainer>
    {text && <LoadingText>{text}</LoadingText>}
  </SpinnerWrapper>
);

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string,
  fullscreen: PropTypes.bool
};

export default LoadingSpinner;
