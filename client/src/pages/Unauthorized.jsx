import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLock, FiArrowLeft } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
`;

const IconWrapper = styled(motion.div)`
  font-size: 4rem;
  color: ${({ theme }) => theme.warningColor};
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`;

const Message = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColorLight};
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
  }
`;

const Unauthorized = () => {
  const location = useLocation();
  const message = location.state?.message || "You don't have permission to access this page";
  
  // Mock theme for styling
  const theme = {
    warningColor: '#FFC107',
    textColor: '#333333',
    textColorLight: '#666666',
    primaryColor: '#800080'
  };

  return (
    <Container>
      <IconWrapper
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        theme={theme}
      >
        <FiLock />
      </IconWrapper>
      
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        theme={theme}
      >
        Access Denied
      </Title>
      
      <Message
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        theme={theme}
      >
        {message}
      </Message>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <BackLink to="/" theme={theme}>
          <FiArrowLeft /> Go Back to Home
        </BackLink>
      </motion.div>
    </Container>
  );
};

export default Unauthorized;