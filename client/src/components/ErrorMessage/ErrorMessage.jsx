import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin: 10px 0;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return theme.warningColor + '22';
      case 'info':
        return theme.primaryColor + '22';
      default:
        return theme.errorColor + '22';
    }
  }};
  border-left: 4px solid ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return theme.warningColor;
      case 'info':
        return theme.primaryColor;
      default:
        return theme.errorColor;
    }
  }};
  border-radius: 4px;
  color: ${({ theme }) => theme.textColor};
  animation: ${slideIn} 0.3s ease-out;
  position: relative;
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'warning':
        return theme.warningColor;
      case 'info':
        return theme.primaryColor;
      default:
        return theme.errorColor;
    }
  }};
  
  svg {
    font-size: 20px;
  }
`;

const MessageContent = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.5;
  cursor: pointer;
  padding: 4px;
  margin-left: 12px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    font-size: 16px;
  }
`;

const ErrorMessage = ({
  title,
  message,
  variant = 'error',
  onClose,
  showIcon = true,
  showCloseButton = true
}) => (
  <ErrorContainer variant={variant}>
    {showIcon && (
      <IconWrapper variant={variant}>
        <FaExclamationCircle />
      </IconWrapper>
    )}
    <MessageContent>
      {title && <Title>{title}</Title>}
      <Message>{message}</Message>
    </MessageContent>
    {showCloseButton && onClose && (
      <CloseButton onClick={onClose} aria-label="Close message">
        <FaTimes />
      </CloseButton>
    )}
  </ErrorContainer>
);

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'warning', 'info']),
  onClose: PropTypes.func,
  showIcon: PropTypes.bool,
  showCloseButton: PropTypes.bool
};

export default ErrorMessage;
