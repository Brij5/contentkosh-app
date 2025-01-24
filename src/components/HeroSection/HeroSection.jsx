import React from "react";
import {
  StyledHeroSection,
  StyledHeroTitle,
  StyledHeroDescription,
  StyledHeroButton,
} from "./HeroSection.styled";

const HeroSection = ({ theme }) => {
  return (
    <StyledHeroSection theme={theme}>
      <StyledHeroTitle>Elevate Your Content Game with ContentKosh</StyledHeroTitle>
      <StyledHeroDescription>
        Unlock the power of words with our high-quality content services, tailored to your unique needs.
      </StyledHeroDescription>
      <StyledHeroButton theme={theme}>Explore Services</StyledHeroButton>
    </StyledHeroSection>
  );
};

export default HeroSection;
