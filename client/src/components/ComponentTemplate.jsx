import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
`;

const ComponentName = () => {
  return <StyledSection>{/* Component content */}</StyledSection>;
};

export default ComponentName;
