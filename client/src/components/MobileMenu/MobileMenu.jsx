import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s,
    visibility 0.3s;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const MenuList = styled.nav`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  padding: 12px;
  border-radius: 6px;
  transition: background 0.3s;
  font-size: 1.1rem;

  &:hover {
    background: ${({ theme }) => theme.backgroundHover};
  }

  &.active {
    color: ${({ theme }) => theme.primaryColor};
    background: ${({ theme }) => theme.backgroundActive};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const AuthButton = styled(Link)`
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  transition:
    background 0.3s,
    color 0.3s;

  ${({ primary, theme }) =>
    primary
      ? `
    background: ${theme.primaryColor};
    color: white;
    &:hover {
      background: ${theme.primaryColorHover};
    }
  `
      : `
    background: transparent;
    color: ${theme.textColor};
    border: 1px solid ${theme.borderColor};
    &:hover {
      background: ${theme.backgroundHover};
    }
  `}
`;

const MobileMenu = ({ isOpen, onClose, isAuthenticated }) => {
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' }
  ];

  if (isAuthenticated) {
    menuItems.push(
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/profile', label: 'Profile' }
    );
  }

  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />
      <MenuContainer isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item.path} to={item.path} onClick={onClose}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
        {!isAuthenticated && (
          <AuthButtons>
            <AuthButton to="/login" onClick={onClose}>
              Log In
            </AuthButton>
            <AuthButton to="/signup" primary onClick={onClose}>
              Sign Up
            </AuthButton>
          </AuthButtons>
        )}
      </MenuContainer>
    </>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

MobileMenu.defaultProps = {
  isAuthenticated: false
};

export default MobileMenu;
