import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const ToastContainer = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return theme.successColor + '10';
      case 'error':
        return theme.errorColor + '10';
      case 'warning':
        return theme.warningColor + '10';
      case 'info':
        return theme.infoColor + '10';
      default:
        return theme.cardBackground;
    }
  }};
  border: 1px solid ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return theme.successColor + '30';
      case 'error':
        return theme.errorColor + '30';
      case 'warning':
        return theme.warningColor + '30';
      case 'info':
        return theme.infoColor + '30';
      default:
        return theme.borderColor;
    }
  }};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 500px;
  pointer-events: auto;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'success':
        return theme.successColor;
      case 'error':
        return theme.errorColor;
      case 'warning':
        return theme.warningColor;
      case 'info':
        return theme.infoColor;
      default:
        return theme.textColor;
    }
  }};

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
`;

const Message = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const toastVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.2
    }
  }
};

const getIcon = (variant) => {
  switch (variant) {
    case 'success':
      return <FiCheckCircle />;
    case 'error':
      return <FiAlertCircle />;
    case 'warning':
      return <FiAlertTriangle />;
    case 'info':
      return <FiInfo />;
    default:
      return null;
  }
};

const Toast = ({
  variant = 'default',
  title,
  message,
  onClose,
  className
}) => {
  return (
    <ToastContainer
      variant={variant}
      className={className}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <IconWrapper variant={variant}>
        {getIcon(variant)}
      </IconWrapper>
      <Content>
        {title && <Title>{title}</Title>}
        {message && <Message>{message}</Message>}
      </Content>
      {onClose && (
        <CloseButton
          onClick={onClose}
          aria-label="Close toast"
        >
          <FiX />
        </CloseButton>
      )}
    </ToastContainer>
  );
};

Toast.propTypes = {
  variant: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Toast; 