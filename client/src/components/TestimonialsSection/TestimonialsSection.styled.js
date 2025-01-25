import styled from 'styled-components';

export const StyledTestimonialsSection = styled.section`
  padding: 8rem 0;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const StyledTestimonialsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 2rem;
`;

export const StyledTestimonialSlider = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
`;

export const StyledTestimonialSlide = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
`;

export const StyledSliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;
