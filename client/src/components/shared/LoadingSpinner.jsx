import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: ${({ fullHeight }) => fullHeight ? '100vh' : 'auto'};
`;

const Spinner = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '1rem';
      case 'large':
        return '3rem';
      default:
        return '2rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '1rem';
      case 'large':
        return '3rem';
      default:
        return '2rem';
    }
  }};
  border: ${({ size }) => {
    switch (size) {
      case 'small':
        return '2px';
      case 'large':
        return '4px';
      default:
        return '3px';
    }
  }} solid ${({ theme }) => theme.borderColor};
  border-top-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.primaryColor;
      case 'secondary':
        return theme.secondaryColor;
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      case 'info':
        return theme.infoColor;
      default:
        return theme.primaryColor;
    }
  }};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.75rem';
      case 'large':
        return '1.25rem';
      default:
        return '1rem';
    }
  }};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Dot = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem';
      case 'large':
        return '1rem';
      default:
        return '0.75rem';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem';
      case 'large':
        return '1rem';
      default:
        return '0.75rem';
    }
  }};
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.primaryColor;
      case 'secondary':
        return theme.secondaryColor;
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      case 'info':
        return theme.infoColor;
      default:
        return theme.primaryColor;
    }
  }};
  border-radius: 50%;
  animation: ${pulse} 0.8s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const LoadingSpinner = ({
  variant = 'primary',
  size = 'medium',
  text,
  fullHeight = false,
  type = 'spinner',
  className
}) => {
  return (
    <SpinnerContainer fullHeight={fullHeight} className={className}>
      {type === 'spinner' ? (
        <Spinner
          variant={variant}
          size={size}
          role="status"
          aria-label="Loading"
        />
      ) : (
        <DotsContainer>
          {[0, 1, 2].map((i) => (
            <Dot
              key={i}
              variant={variant}
              size={size}
              delay={i * 0.2}
              role="status"
              aria-label="Loading"
            />
          ))}
        </DotsContainer>
      )}
      {text && <LoadingText size={size}>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

LoadingSpinner.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
  fullHeight: PropTypes.bool,
  type: PropTypes.oneOf(['spinner', 'dots']),
  className: PropTypes.string
};

export default LoadingSpinner; 