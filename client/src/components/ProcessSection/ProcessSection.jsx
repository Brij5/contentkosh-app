import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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
  padding: 6rem 2rem;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.cardBackground} 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textColor};
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Description = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  color: ${({ theme }) => theme.colors.textColor};
  opacity: 0.9;
  line-height: 1.6;
  animation: ${fadeInUp} 0.6s ease-out 0.2s backwards;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    z-index: 0;
    opacity: 0.3;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.6s ease-out backwards;
  animation-delay: ${({ index }) => `${0.4 + index * 0.2}s`};
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  i {
    font-size: 2rem;
  }
`;

const StepTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.textColor};
  opacity: 0.8;
  line-height: 1.6;
  max-width: 300px;
  margin: 0 auto;
`;

const ProcessSection = ({ theme }) => {
  const steps = [
    {
      icon: 'fas fa-comments',
      title: 'Initial Consultation',
      description: 'We start with a detailed discussion to understand your content needs and goals.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Strategy Development',
      description: 'Our team creates a customized content strategy aligned with your objectives.'
    },
    {
      icon: 'fas fa-pen-fancy',
      title: 'Content Creation',
      description: 'Expert writers craft engaging content that resonates with your target audience.'
    },
    {
      icon: 'fas fa-check-circle',
      title: 'Review & Delivery',
      description: 'Quality checks and revisions ensure the content meets your expectations.'
    }
  ];

  return (
    <Section id="process" theme={theme}>
      <Container>
        <Title theme={theme}>Our Process</Title>
        <Description theme={theme}>
          We follow a systematic approach to deliver high-quality content that drives results.
        </Description>
        <ProcessSteps theme={theme}>
          {steps.map((step, index) => (
            <ProcessStep key={index} index={index}>
              <StepNumber theme={theme}>
                <i className={step.icon}></i>
              </StepNumber>
              <StepTitle theme={theme}>{step.title}</StepTitle>
              <StepDescription theme={theme}>{step.description}</StepDescription>
            </ProcessStep>
          ))}
        </ProcessSteps>
      </Container>
    </Section>
  );
};

ProcessSection.propTypes = {
  theme: PropTypes.object.isRequired
};

export default ProcessSection;