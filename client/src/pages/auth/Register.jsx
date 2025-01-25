import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { registerUser, clearAuthError } from '../../store/actions/authActions';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../store/slices/authSlice';

// Reuse styled components from Login
const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

const Input = styled.input`
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
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.errorColor};
  font-size: 0.9rem;
`;

const LinkText = styled(Link)`
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...registerData } = formData;
      const success = await dispatch(registerUser(registerData));
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <Container>
      <Title>Create Account</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            disabled={isLoading}
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? 'name-error' : undefined}
          />
          {formErrors.name && (
            <ErrorText id="name-error" role="alert">
              {formErrors.name}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            disabled={isLoading}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? 'email-error' : undefined}
          />
          {formErrors.email && (
            <ErrorText id="email-error" role="alert">
              {formErrors.email}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            disabled={isLoading}
            aria-invalid={!!formErrors.password}
            aria-describedby={formErrors.password ? 'password-error' : undefined}
          />
          {formErrors.password && (
            <ErrorText id="password-error" role="alert">
              {formErrors.password}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            disabled={isLoading}
            aria-invalid={!!formErrors.confirmPassword}
            aria-describedby={formErrors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          {formErrors.confirmPassword && (
            <ErrorText id="confirm-password-error" role="alert">
              {formErrors.confirmPassword}
            </ErrorText>
          )}
        </FormGroup>

        {error && (
          <ErrorText role="alert">
            {error}
          </ErrorText>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>

        <LinkText to="/login">
          Already have an account? Log in
        </LinkText>
      </Form>
    </Container>
  );
};

export default Register; 