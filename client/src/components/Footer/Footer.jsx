import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink to="/about">Our Story</FooterLink>
          <FooterLink to="/team">Our Team</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Services</FooterTitle>
          <FooterLink to="/services">All Services</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/enterprise">Enterprise</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/docs">Documentation</FooterLink>
          <FooterLink to="/support">Support</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/cookies">Cookie Policy</FooterLink>
        </FooterSection>
      </FooterContent>
      <Copyright>
        &copy; {currentYear} ContentKosh. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;