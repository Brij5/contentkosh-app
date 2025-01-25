import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.article`
  background: ${({ theme }) => theme.backgroundSecondary};
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Icon = styled.span`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primaryColor};
  margin-bottom: 1rem;
  display: inline-block;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textColor};
  line-height: 1.6;
  opacity: 0.9;
`;

const features = [
  {
    icon: '📝',
    title: 'Content Management',
    description: 'Easily organize and manage your content with our intuitive interface.',
    ariaLabel: 'Content Management Feature'
  },
  {
    icon: '🔄',
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks and streamline your content workflow.',
    ariaLabel: 'Workflow Automation Feature'
  },
  {
    icon: '📊',
    title: 'Analytics & Insights',
    description: 'Track performance and gain valuable insights about your content.',
    ariaLabel: 'Analytics and Insights Feature'
  }
];

const FeaturesSection = () => {
  return (
    <Section aria-labelledby="features-title">
      <SectionTitle id="features-title">Our Features</SectionTitle>
      <Grid role="list">
        {features.map((feature, index) => (
          <Card 
            key={index}
            role="listitem"
            aria-labelledby={`feature-title-${index}`}
          >
            <Icon role="img" aria-label={feature.icon}>
              {feature.icon}
            </Icon>
            <Title id={`feature-title-${index}`}>
              {feature.title}
            </Title>
            <Description>
              {feature.description}
            </Description>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default FeaturesSection; 