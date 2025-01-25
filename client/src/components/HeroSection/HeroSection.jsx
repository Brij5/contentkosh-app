import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`};
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 80vh;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin-top: 1rem;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}15;
  filter: blur(80px);
  z-index: 0;
  &.shape1 {
    top: -100px;
    right: -100px;
  }
  &.shape2 {
    bottom: -100px;
    left: -100px;
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 968px) {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const HeroSection = ({ onGetStarted, onLearnMore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Some effect logic if needed
    // For example, initializing form data from local storage
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form and show success message
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <HeroContainer>
      <BackgroundShape 
        className="shape1"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <BackgroundShape 
        className="shape2"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <ContentWrapper as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        <TextContent>
          <Title variants={itemVariants}>
            Transform Your Content with <span>AI-Powered</span> Solutions
          </Title>
          <Subtitle variants={itemVariants}>
            Streamline your content creation process with our advanced AI tools. Create, manage, and optimize your content effortlessly.
          </Subtitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Message</Label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Form>
          {isSubmitted && (
            <SuccessMessage>Thank you for your message! We'll get back to you soon.</SuccessMessage>
          )}
        </TextContent>
        <ImageContainer
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src="/assets/hero-image.png" 
            alt="AI Content Management Platform"
            loading="eager"
          />
        </ImageContainer>
      </ContentWrapper>
    </HeroContainer>
  );
};

HeroSection.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
  onLearnMore: PropTypes.func.isRequired
};
export default HeroSection;
