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
    ${({ theme }) => theme.backgroundColor} 0%,
    ${({ theme }) => theme.cardBackground} 100%
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
  max-width: 600px;
  margin: 0 auto 4rem;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  line-height: 1.6;
  animation: ${fadeInUp} 0.6s ease-out 0.2s backwards;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const TestimonialCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  animation: ${fadeInUp} 0.6s ease-out backwards;
  animation-delay: ${({ index }) => `${0.4 + index * 0.2}s`};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '"';
    position: absolute;
    top: -15px;
    left: 25px;
    font-size: 8rem;
    color: ${({ theme }) => theme.primaryColor};
    opacity: 0.1;
    font-family: Georgia, serif;
    pointer-events: none;
  }
`;

const TestimonialText = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  position: relative;
  font-style: italic;
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primaryColor},
    ${({ theme }) => theme.secondaryColor}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ClientDetails = styled.div`
  flex: 1;
`;

const ClientName = styled.span`
  display: block;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const ClientRole = styled.span`
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  font-size: 0.9rem;
`;

const TestimonialsSection = ({ testimonials = [], theme }) => {
  return (
    <Section id="testimonials" theme={theme}>
      <Container>
        <Title theme={theme}>What Our Clients Say</Title>
        <Description theme={theme}>
          Don't just take our word for it - hear from some of our satisfied clients about their
          experience working with us
        </Description>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} theme={theme} index={index}>
              <TestimonialText theme={theme}>{testimonial.text}</TestimonialText>
              <ClientInfo>
                <Avatar theme={theme}>{testimonial.name.charAt(0)}</Avatar>
                <ClientDetails>
                  <ClientName theme={theme}>{testimonial.name}</ClientName>
                  <ClientRole theme={theme}>{testimonial.role}</ClientRole>
                </ClientDetails>
              </ClientInfo>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </Section>
  );
};

TestimonialsSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    })
  ),
  theme: PropTypes.object.isRequired
};

export default TestimonialsSection;
