import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ripple = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem 1rem';
      case 'large':
        return '1rem 2.5rem';
      default:
        return '0.75rem 1.5rem';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.875rem';
      case 'large':
        return '1.125rem';
      default:
        return '1rem';
    }
  }};
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  position: relative;
  overflow: hidden;
  user-select: none;

  ${({ variant, theme, outlined }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${outlined ? 'transparent' : theme.secondaryColor};
          color: ${outlined ? theme.secondaryColor : 'white'};
          border-color: ${theme.secondaryColor};

          &:hover:not(:disabled) {
            background: ${outlined ? theme.secondaryColor + '10' : theme.secondaryColor + 'E6'};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.secondaryColor}40;
          }
        `;
      case 'danger':
        return `
          background: ${outlined ? 'transparent' : theme.errorColor};
          color: ${outlined ? theme.errorColor : 'white'};
          border-color: ${theme.errorColor};

          &:hover:not(:disabled) {
            background: ${outlined ? theme.errorColor + '10' : theme.errorColor + 'E6'};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.errorColor}40;
          }
        `;
      case 'success':
        return `
          background: ${outlined ? 'transparent' : theme.successColor};
          color: ${outlined ? theme.successColor : 'white'};
          border-color: ${theme.successColor};

          &:hover:not(:disabled) {
            background: ${outlined ? theme.successColor + '10' : theme.successColor + 'E6'};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.successColor}40;
          }
        `;
      default:
        return `
          background: ${outlined ? 'transparent' : theme.primaryColor};
          color: ${outlined ? theme.primaryColor : 'white'};
          border-color: ${theme.primaryColor};

          &:hover:not(:disabled) {
            background: ${outlined ? theme.primaryColor + '10' : theme.primaryColor + 'E6'};
          }

          &:focus-visible {
            box-shadow: 0 0 0 3px ${theme.primaryColor}40;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }

  .loading-icon {
    animation: ${spin} 1s linear infinite;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ${ripple} 0.6s linear;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: ${({ loading }) => loading ? 0 : 1};
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  outlined = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const buttonRef = React.useRef(null);

  const createRipple = (event) => {
    if (loading || disabled) return;

    const button = buttonRef.current;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleClick = (event) => {
    createRipple(event);
    onClick?.(event);
  };

  return (
    <StyledButton
      ref={buttonRef}
      as={motion.button}
      variant={variant}
      size={size}
      outlined={outlined}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      type={type}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      aria-busy={loading}
      {...props}
    >
      <ContentWrapper loading={loading}>
        {children}
      </ContentWrapper>
      {loading && (
        <LoadingWrapper>
          <FiLoader className="loading-icon" />
        </LoadingWrapper>
      )}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  outlined: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button; 