import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  .required {
    color: ${({ theme }) => theme.errorColor};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid ${({ theme, error }) => error ? theme.errorColor : theme.borderColor};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => error ? theme.errorColor : theme.primaryColor};
    box-shadow: 0 0 0 3px ${({ theme, error }) => 
      error ? theme.errorColor + '20' : theme.primaryColor + '20'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textColorLight};
    opacity: 0.7;
  }
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 100px;
  resize: vertical;
`;

const Select = styled(Input).attrs({ as: 'select' })`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBackground};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background: ${({ theme }) => theme.primaryColor};
    border-color: ${({ theme }) => theme.primaryColor};

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 6px;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primaryColor + '20'};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Radio = styled(Checkbox).attrs({ type: 'radio' })`
  border-radius: 50%;

  &:checked::after {
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    border: none;
    border-radius: 50%;
    background: white;
    transform: none;
  }
`;

const ErrorText = styled(motion.span)`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const HelperText = styled.span`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
`;

const Form = ({ children, onSubmit, className, ...props }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <StyledForm
      onSubmit={handleSubmit}
      className={className}
      {...props}
    >
      {children}
    </StyledForm>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string
};

export {
  Form as default,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  ErrorText,
  HelperText
}; 