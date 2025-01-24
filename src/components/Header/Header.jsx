import React from "react";
import {
  StyledHeader,
  StyledContainer,
  StyledLogoContainer,
  StyledNav,
  StyledNavLink,
  StyledDarkModeButton,
} from "./Header.styled";

const Header = ({ isDarkMode, toggleDarkMode, theme }) => {
  return (
    <StyledHeader theme={theme}>
      <StyledContainer>
        <StyledLogoContainer>
          <img src="/assets/images/logo.png" alt="ContentKosh Logo" />
          <h1>ContentKosh</h1>
        </StyledLogoContainer>
        <StyledNav>
          {["services", "about", "blogs", "contact"].map((nav) => (
            <StyledNavLink key={nav} href={`#${nav}`}>
              {nav.charAt(0).toUpperCase() + nav.slice(1)}
            </StyledNavLink>
          ))}
        </StyledNav>
        <StyledDarkModeButton onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </StyledDarkModeButton>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
