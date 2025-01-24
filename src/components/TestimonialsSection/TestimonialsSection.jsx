import React, { useState } from "react";
import {
  StyledTestimonialsSection,
  StyledTestimonialsTitle,
  StyledTestimonialSlider,
  StyledTestimonialSlide,
  StyledSliderButton,
} from "./TestimonialsSection.styled";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = ({ testimonials, theme }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <StyledTestimonialsSection theme={theme}>
      <StyledTestimonialsTitle>What Our Clients Say</StyledTestimonialsTitle>
      <StyledTestimonialSlider>
        {testimonials.map((testimonial, index) => (
          <StyledTestimonialSlide key={index} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            <TestimonialCard testimonial={testimonial} theme={theme} />
          </StyledTestimonialSlide>
        ))}
        <StyledSliderButton onClick={handlePrev}>&lt;</StyledSliderButton>
        <StyledSliderButton onClick={handleNext}>&gt;</StyledSliderButton>
      </StyledTestimonialSlider>
    </StyledTestimonialsSection>
  );
};

export default TestimonialsSection;
