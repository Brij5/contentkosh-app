import React from "react";
import {
  StyledFooter,
  StyledFooterContainer,
  StyledFooterText,
  StyledBackToTopButton,
} from "./Footer.styled";

const Footer = ({ theme }) => {
  return (
    <StyledFooter theme={theme}>
      <StyledFooterContainer>
        <StyledBackToTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to Top
        </StyledBackToTopButton>
        <StyledFooterText>&copy; 2025 ContentKosh. All rights reserved.</StyledFooterText>
      </StyledFooterContainer>
    </StyledFooter>
  );
};

export default Footer;
