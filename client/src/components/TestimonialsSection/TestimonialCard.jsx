import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Content = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-style: italic;
  margin-bottom: 1rem;
`;

const Name = styled.h4`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.5rem;
`;

const Role = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

const TestimonialCard = ({ testimonial, theme }) => {
  return (
    <Card theme={theme}>
      <Content theme={theme}>{testimonial.content}</Content>
      <Name theme={theme}>{testimonial.name}</Name>
      <Role theme={theme}>{testimonial.role}</Role>
    </Card>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object.isRequired
};

export default TestimonialCard;
