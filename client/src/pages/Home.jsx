import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
// We're using the nested Services component now
import ServicesSection from '../components/ServicesSection/ServicesSection';
import ProcessSection from '../components/ProcessSection/ProcessSection';
import ContactSection from '../components/ContactSection/ContactSection';
import AboutSection from '../components/AboutSection/AboutSection';
import Footer from '../components/Footer/Footer';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  
  // Mock team members data for AboutSection
  const teamMembers = [
    {
      id: 1,
      name: 'Jane Doe',
      role: 'Content Director',
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'SEO Specialist',
      image: 'https://via.placeholder.com/300'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      role: 'Content Writer',
      image: 'https://via.placeholder.com/300'
    },
  ];

  // Handler functions for HeroSection
  const handleGetStarted = () => {
    console.log('Get Started clicked');
  };
  
  const handleLearnMore = () => {
    console.log('Learn More clicked');
  };

  return (
    <>
      <HeroSection 
        onGetStarted={handleGetStarted} 
        onLearnMore={handleLearnMore}
        theme={theme}
      />
      <ServicesSection theme={theme} />
      <ProcessSection theme={theme} />
      <AboutSection theme={theme} teamMembers={teamMembers} />
      <ContactSection theme={theme} />
      <Footer theme={theme} />
    </>
  );
};

export default Home;