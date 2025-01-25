import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheck } from 'react-icons/fi';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
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

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ValidationIcon = styled(motion.div)`
  position: absolute;
  right: ${({ hasPasswordToggle }) => hasPasswordToggle ? '2.5rem' : '0.75rem'};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, isValid }) => isValid ? theme.successColor : theme.errorColor};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.5rem 0.75rem';
      case 'large':
        return '0.875rem 1rem';
      default:
        return '0.75rem 1rem';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0.875rem';
      case 'large':
        return '1.125rem';
      default:
        return '1rem';
    }
  }};
  border: 2px solid ${({ theme, error, isValid }) => {
    if (error) return theme.errorColor;
    if (isValid) return theme.successColor;
    return theme.borderColor;
  }};
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme, error, isValid }) => {
      if (error) return theme.errorColor;
      if (isValid) return theme.successColor;
      return theme.primaryColor;
    }};
    box-shadow: 0 0 0 3px ${({ theme, error, isValid }) => {
      if (error) return theme.errorColor + '20';
      if (isValid) return theme.successColor + '20';
      return theme.primaryColor + '20';
    }};
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

  ${({ hasIcon, hasValidation }) => (hasIcon || hasValidation) && `
    padding-right: ${hasIcon && hasValidation ? '4rem' : '2.5rem'};
  `}

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &::-ms-clear,
  &::-ms-reveal {
    display: none;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const IconWrapper = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textColorLight};
  cursor: pointer;
  padding: 0.25rem;
  border: none;
  background: none;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ErrorMessage = styled(motion.span)`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

const HelperText = styled.span`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 0.875rem;
`;

const Input = forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  size = 'medium',
  required = false,
  disabled = false,
  className,
  validate,
  onValidate,
  pattern,
  minLength,
  maxLength,
  min,
  max,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = (event) => {
    if (!validate) return;

    const value = event.target.value;
    let isValidInput = true;

    if (pattern && !new RegExp(pattern).test(value)) {
      isValidInput = false;
    }

    if (minLength && value.length < minLength) {
      isValidInput = false;
    }

    if (maxLength && value.length > maxLength) {
      isValidInput = false;
    }

    if (type === 'number') {
      const numValue = Number(value);
      if (min !== undefined && numValue < min) {
        isValidInput = false;
      }
      if (max !== undefined && numValue > max) {
        isValidInput = false;
      }
    }

    if (typeof validate === 'function') {
      isValidInput = validate(value);
    }

    setIsValid(isValidInput);
    onValidate?.(isValidInput);
  };

  const handleBlur = (event) => {
    setIsTouched(true);
    handleValidation(event);
    props.onBlur?.(event);
  };

  const handleChange = (event) => {
    if (isTouched) {
      handleValidation(event);
    }
    props.onChange?.(event);
  };

  return (
    <InputWrapper className={className}>
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="required">*</span>}
        </Label>
      )}
      <InputContainer>
        <StyledInput
          ref={ref}
          type={inputType}
          size={size}
          error={error}
          isValid={isTouched && isValid && !error}
          disabled={disabled}
          required={required}
          hasIcon={type === 'password'}
          hasValidation={validate && isTouched}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${props.id}-error` : 
            helperText ? `${props.id}-helper` : undefined
          }
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        {validate && isTouched && !error && (
          <ValidationIcon
            hasPasswordToggle={type === 'password'}
            isValid={isValid}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {isValid ? <FiCheck /> : <FiAlertCircle />}
          </ValidationIcon>
        )}
        {type === 'password' && (
          <IconWrapper
            onClick={togglePasswordVisibility}
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </IconWrapper>
        )}
      </InputContainer>
      <AnimatePresence mode="wait">
        {error && (
          <ErrorMessage
            id={`${props.id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <FiAlertCircle />
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>
      {helperText && !error && (
        <HelperText id={`${props.id}-helper`}>
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url', 'search']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onValidate: PropTypes.func,
  pattern: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  id: PropTypes.string.isRequired
};

export default Input; 