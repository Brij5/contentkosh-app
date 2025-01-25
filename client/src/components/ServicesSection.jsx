import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const services = [
  {
    id: 1,
    title: 'Content Writing',
    description: 'Professional content writing services tailored to your needs',
    icon: '📝',
  },
  {
    id: 2,
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings with our SEO services',
    icon: '🔍',
  },
  {
    id: 3,
    title: 'Social Media Management',
    description: 'Engage your audience with effective social media strategies',
    icon: '📱',
  },
];

const ServicesSection = () => {
  return (
    <ServicesContainer>
      <Title>Our Services</Title>
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default ServicesSection; 