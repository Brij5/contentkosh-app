import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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

const Section = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.cardBackground} 0%,
    ${({ theme }) => theme.backgroundColor} 100%
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
  color: ${({ theme }) => theme.textColor};
  animation: ${fadeInUp} 0.6s ease-out;
`;

const Description = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.9;
  line-height: 1.6;
  animation: ${fadeInUp} 0.6s ease-out 0.2s backwards;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PricingCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  animation: ${fadeInUp} 0.6s ease-out backwards;
  animation-delay: ${({ index }) => `${0.4 + index * 0.2}s`};
  border: 2px solid transparent;

  ${({ isPopular, theme }) =>
    isPopular &&
    `
    border-color: ${theme.primaryColor};
    transform: scale(1.05);
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor});
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
    }
  `}

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PlanName = styled.h3`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;

  span {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const Feature = styled.li`
  color: ${({ theme }) => theme.textColor};
  padding: 0.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  i {
    color: ${({ theme }) => theme.primaryColor};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CTAButton = styled.button`
  background: ${({ isPopular, theme }) =>
    isPopular
      ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
      : 'transparent'};
  color: ${({ isPopular, theme }) => (isPopular ? 'white' : theme.primaryColor)};
  border: 2px solid ${({ theme }) => theme.primaryColor};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primaryColor},
      ${({ theme }) => theme.secondaryColor}
    );
    color: white;
    transform: translateY(-2px);
  }
`;

const PricingSection = ({ theme }) => {
  const plans = [
    {
      name: 'Basic',
      price: '299',
      features: [
        '5 Blog Posts per Month',
        'SEO Optimization',
        'Content Calendar',
        'Basic Analytics',
        '2 Revisions per Post'
      ],
      isPopular: false
    },
    {
      name: 'Professional',
      price: '599',
      features: [
        '10 Blog Posts per Month',
        'Advanced SEO Optimization',
        'Content Strategy',
        'Social Media Posts',
        'Unlimited Revisions',
        'Priority Support'
      ],
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: '999',
      features: [
        '20 Blog Posts per Month',
        'Complete Content Marketing',
        'Dedicated Content Manager',
        'Custom Analytics Dashboard',
        'Social Media Management',
        '24/7 Priority Support'
      ],
      isPopular: false
    }
  ];

  return (
    <Section id="pricing" theme={theme}>
      <Container>
        <Title theme={theme}>Pricing Plans</Title>
        <Description theme={theme}>
          Choose the perfect plan for your content needs. All plans include quality content written
          by expert writers.
        </Description>
        <PricingGrid>
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} theme={theme} isPopular={plan.isPopular} index={index}>
              <PlanName theme={theme}>{plan.name}</PlanName>
              <PlanPrice theme={theme}>
                ${plan.price}
                <span>/month</span>
              </PlanPrice>
              <FeaturesList>
                {plan.features.map((feature, i) => (
                  <Feature key={i} theme={theme}>
                    <i className="fas fa-check-circle"></i>
                    {feature}
                  </Feature>
                ))}
              </FeaturesList>
              <CTAButton
                theme={theme}
                isPopular={plan.isPopular}
                onClick={() =>
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
                }
              >
                Get Started
              </CTAButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </Container>
    </Section>
  );
};

PricingSection.propTypes = {
  theme: PropTypes.object.isRequired
};

export default PricingSection;
