import styled from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => (theme.textColor === 'white' ? '#374151' : '#d1d5db')};
`;

export const StyledFooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

export const StyledFooterText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => (theme.textColor === 'white' ? '#9ca3af' : '#6b7280')};
`;

export const StyledBackToTopButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;
