import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiX
} from 'react-icons/fi';

const AlertContainer = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
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
  color: ${({ theme }) => theme.textColor};
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
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
`;

const Message = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.textColorLight};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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

const alertVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const Alert = ({
  variant = 'info',
  title,
  message,
  onClose,
  className,
  show = true
}) => {
  return (
    <AnimatePresence>
      {show && (
        <AlertContainer
          role="alert"
          variant={variant}
          className={className}
          variants={alertVariants}
          initial="hidden"
          animate="visible"
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
              aria-label="Close alert"
            >
              <FiX />
            </CloseButton>
          )}
        </AlertContainer>
      )}
    </AnimatePresence>
  );
};

Alert.propTypes = {
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
  show: PropTypes.bool
};

export default Alert; 