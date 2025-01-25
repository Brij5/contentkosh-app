import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderContainer = styled.header`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
`;

const Nav = styled.nav`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const ThemeToggle = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">ContentKosh</Logo>
        <NavLinks>
          <NavLink to="/" active={isActive('/')}>Home</NavLink>
          <NavLink to="/about" active={isActive('/about')}>About</NavLink>
          <NavLink to="/services" active={isActive('/services')}>Services</NavLink>
          <NavLink to="/contact" active={isActive('/contact')}>Contact</NavLink>
          <ThemeToggle onClick={() => toggleTheme()}>
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </ThemeToggle>
        </NavLinks>
        <MobileMenuButton>
          <FiMenu size={24} />
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;