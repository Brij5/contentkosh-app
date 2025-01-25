import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 6rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeLink = styled(Link)`
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>
        Oops! The page you're looking for doesn't exist. It might have been moved
        or deleted.
      </Description>
      <HomeLink to="/">Return to Home</HomeLink>
    </Container>
  );
};

export default NotFound; 