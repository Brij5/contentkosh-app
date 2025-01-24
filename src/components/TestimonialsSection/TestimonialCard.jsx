import React from "react";
import styled from "styled-components";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i}>⭐</span>);
    } else if (i - 0.5 === rating) {
      stars.push(<span key={i}>½</span>);
    } else {
      stars.push(<span key={i}>☆</span>);
    }
  }
  return stars;
};

const StyledTestimonialCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackgroundColor};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
`;

const StyledTestimonialStars = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StyledTestimonialContent = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
`;

const StyledTestimonialMeta = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => (theme.textColor === "white" ? "#9ca3af" : "#6b7280")};
`;

const TestimonialCard = ({ testimonial, theme }) => {
  return (
    <StyledTestimonialCard theme={theme}>
      <StyledTestimonialStars>{renderStars(testimonial.rating)}</StyledTestimonialStars>
      <StyledTestimonialContent>"{testimonial.content}"</StyledTestimonialContent>
      <StyledTestimonialMeta>
        {testimonial.name} - {testimonial.role}
      </StyledTestimonialMeta>
    </StyledTestimonialCard>
  );
};

export default TestimonialCard;
