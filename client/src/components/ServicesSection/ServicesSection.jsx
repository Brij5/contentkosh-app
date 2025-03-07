import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';
import { FiFileText, FiEdit, FiCamera, FiYoutube, FiBarChart } from 'react-icons/fi';

// Define keyframes for fade-in animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const Section = styled.section`
  padding: 4rem 0;
  background: ${({ theme }) => theme.backgroundSecondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textColorLight};
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.borderColor};
  border-top-color: ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
  margin: 2rem auto;
`;

// ServicesSection component with mock data
const ServicesSection = ({ theme }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Apply default theme if none is provided
  const defaultTheme = theme || {
    backgroundSecondary: '#f9f9f9',
    primaryColor: '#800080',
    textColor: '#333333',
    textColorLight: '#666666',
    borderColor: '#e0e0e0'
  };

  useEffect(() => {
    // Mock service data
    const mockServices = [
      {
        _id: '1',
        title: 'Content Creation',
        description: 'Professional content writing services tailored to your brand voice and marketing goals.',
        icon: <FiFileText size={24} />,
        color: '#4CAF50',
        price: '$250',
        features: ['SEO optimized', 'Brand voice matching', 'Research included']
      },
      {
        _id: '2',
        title: 'Content Editing',
        description: 'Expert editing services to enhance your existing content for clarity and engagement.',
        icon: <FiEdit size={24} />,
        color: '#2196F3',
        price: '$150',
        features: ['Grammar correction', 'Style enhancement', 'SEO improvements']
      },
      {
        _id: '3',
        title: 'Visual Content',
        description: 'High-quality visual content including infographics, banners, and custom imagery.',
        icon: <FiCamera size={24} />,
        color: '#9C27B0',
        price: '$350',
        features: ['Custom graphics', 'Brand consistency', 'Multiple formats']
      },
      {
        _id: '4',
        title: 'Video Content',
        description: 'Engaging video content creation from scriptwriting to final production.',
        icon: <FiYoutube size={24} />,
        color: '#F44336',
        price: '$500',
        features: ['Full production', 'Animation options', 'Social media formats']
      },
      {
        _id: '5',
        title: 'Content Strategy',
        description: 'Comprehensive content strategy development to achieve your business objectives.',
        icon: <FiBarChart size={24} />,
        color: '#FF9800',
        price: '$450',
        features: ['Competitor analysis', 'Channel planning', 'Performance metrics']
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Section theme={defaultTheme}>
      <Container>
        <Title theme={defaultTheme}>Our Services</Title>
        <SubTitle theme={defaultTheme}>
          We offer a comprehensive range of content solutions to help your business grow and engage with your audience.
        </SubTitle>
        {loading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            theme={defaultTheme}
          />
        ) : (
          <Grid>
            {services && services.length > 0 ? services.map((service) => (
              <ServiceCard key={service._id} service={service} theme={defaultTheme} />
            )) : (
              <p>No services available at the moment.</p>
            )}
          </Grid>
        )}
      </Container>
    </Section>
  );
};

export default ServicesSection;