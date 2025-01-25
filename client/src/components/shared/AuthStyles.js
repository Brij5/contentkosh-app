import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 1rem;
  font-size: 2rem;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${({ theme, error }) => error ? theme.errorColor : theme.borderColor};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textColor}80;
  }
`;

export const Button = styled.button`
  background: ${({ theme, variant }) => 
    variant === 'secondary' ? 'transparent' : theme.primaryColor};
  color: ${({ theme, variant }) => 
    variant === 'secondary' ? theme.primaryColor : 'white'};
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.9rem;
`;

export const SuccessText = styled.p`
  color: ${({ theme }) => theme.successColor};
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const LinkText = styled(Link)`
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export const PasswordRequirements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;

  li {
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: "•";
      color: ${({ theme }) => theme.primaryColor};
    }

    &.valid {
      color: ${({ theme }) => theme.successColor};
      &::before {
        content: "✓";
        color: ${({ theme }) => theme.successColor};
      }
    }
  }
`; 