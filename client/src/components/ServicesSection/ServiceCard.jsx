import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${({ color }) => color || '#3f51b5'};
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: ${({ color }) => color}15;
  color: ${({ color }) => color || '#3f51b5'};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textColorLight};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textColor};
  display: flex;
  align-items: center;
  
  &:before {
    content: '✓';
    color: ${({ color }) => color || '#3f51b5'};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: ${({ color }) => color || '#3f51b5'};
  border: 2px solid ${({ color }) => color || '#3f51b5'};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ color }) => color || '#3f51b5'};
    color: white;
  }
`;

const ServiceCard = ({ service }) => {
  const { title, description, icon, color, price, features } = service;

  return (
    <Card
      color={color}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconContainer color={color}>
        {icon}
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>Starting at {price}</Price>
      <FeaturesList>
        {features && features.map((feature, index) => (
          <Feature key={index} color={color}>
            {feature}
          </Feature>
        ))}
      </FeaturesList>
      <Button color={color}>Learn More</Button>
    </Card>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.node,
    color: PropTypes.string,
    price: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ServiceCard;
