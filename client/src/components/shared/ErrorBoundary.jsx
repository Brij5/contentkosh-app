import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.errorColor};
  margin-bottom: 1rem;

  svg {
    width: 3rem;
    height: 3rem;
  }
`;

const ErrorTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.25rem;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  margin: 0 0 1.5rem;
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: 400px;
`;

const RetryButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColorDark};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};

const buttonVariants = {
  hover: {
    scale: 1.05
  },
  tap: {
    scale: 0.95
  }
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log the error to an error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry() {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render() {
    const { hasError, error } = this.state;
    const {
      fallback,
      children,
      title = 'Something went wrong',
      message = 'We encountered an error while rendering this component.',
      retryButtonText = 'Try again'
    } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback(error, this.handleRetry);
      }

      return (
        <ErrorContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <IconWrapper>
            <FiAlertTriangle />
          </IconWrapper>
          <ErrorTitle>{title}</ErrorTitle>
          <ErrorMessage>{message}</ErrorMessage>
          <RetryButton
            onClick={this.handleRetry}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiRefreshCw />
            {retryButtonText}
          </RetryButton>
        </ErrorContainer>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onError: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  retryButtonText: PropTypes.string
};

export default ErrorBoundary; 