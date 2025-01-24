import styled from "styled-components";

export const StyledContactSection = styled.section`
  padding: 8rem 0;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const StyledContactTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StyledContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.cardBackgroundColor};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const StyledFormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textColor};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => (theme.textColor === "white" ? "#4b5563" : "#d1d5db")};
  border-radius: 0.375rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor + "30"};
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid ${({ theme }) => (theme.textColor === "white" ? "#4b5563" : "#d1d5db")};
  border-radius: 0.375rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor + "30"};
  }
`;

export const StyledSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;
