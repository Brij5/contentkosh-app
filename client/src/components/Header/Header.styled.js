import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 50px;
    width: auto;
    margin-right: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.textColor};
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const StyledNavLink = styled.a`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

export const StyledDarkModeButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;
