import styled from 'styled-components';

export const StyledBlogsSection = styled.section`
  padding: 8rem 0;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const StyledBlogsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StyledBlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
