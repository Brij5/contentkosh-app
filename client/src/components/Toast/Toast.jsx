import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: ${({ theme, type }) => {
    switch (type) {
      case 'success':
        return theme.successColor + '22';
      case 'error':
        return theme.errorColor + '22';
      case 'warning':
        return theme.warningColor + '22';
      default:
        return theme.primaryColor + '22';
    }
  }};
  border-left: 4px solid ${({ theme, type }) => {
    switch (type) {
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      default:
        return theme.primaryColor;
    }
  }};
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
  min-width: 300px;
  max-width: 500px;
`;

const IconWrapper = styled.div`
  margin-right: 12px;
  color: ${({ theme, type }) => {
    switch (type) {
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      default:
        return theme.primaryColor;
    }
  }};

  svg {
    font-size: 20px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0 0 4px 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  font-weight: 600;
`;

const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
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

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle />;
    case 'error':
      return <FaExclamationCircle />;
    case 'warning':
      return <FaExclamationCircle />;
    default:
      return <FaInfoCircle />;
  }
};

const Toast = ({ title, message, type = 'info', onClose }) => (
  <ToastContainer type={type}>
    <IconWrapper type={type}>{getIcon(type)}</IconWrapper>
    <Content>
      {title && <Title>{title}</Title>}
      <Message>{message}</Message>
    </Content>
    {onClose && (
      <CloseButton onClick={onClose} aria-label="Close notification">
        <FaTimes />
      </CloseButton>
    )}
  </ToastContainer>
);

Toast.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func
};

export default Toast; 