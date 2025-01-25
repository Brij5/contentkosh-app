import styled from 'styled-components';

export const StyledServicesSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const StyledServicesTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 3rem;
`;

export const StyledTabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const StyledTabButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme, selected }) =>
    selected ? theme.primaryColor : theme.cardBackgroundColor};
  color: ${({ theme, selected }) => (selected ? 'white' : theme.textColor)};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? theme.primaryColor : theme.secondaryColor};
    color: white;
  }
`;

export const StyledSearchBar = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 3rem;
  border: 1px solid ${({ theme }) => theme.cardBackgroundColor};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.cardBackgroundColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const StyledSearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textColor};
  opacity: 0.5;

  &::before {
    content: '🔍';
  }
`;

export const StyledServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
