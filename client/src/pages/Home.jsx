import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import ProcessSection from '../components/ProcessSection/ProcessSection';
import ContactSection from '../components/ContactSection/ContactSection';
import AboutSection from '../components/AboutSection/AboutSection';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;