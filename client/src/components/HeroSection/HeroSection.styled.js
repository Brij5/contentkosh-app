import styled from 'styled-components';

export const StyledHeroSection = styled.section`
  background-image: url('https://source.unsplash.com/1920x1080/?content');
  background-size: cover;
  background-position: center;
  padding: 8rem 0;
  text-align: center;
  color: ${({ theme }) => theme.textColor};

  @media (min-width: 768px) {
    padding: 12rem 0;
  }
`;

export const StyledHeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const StyledHeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const StyledHeroButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    transform: scale(1.05);
  }
`;
