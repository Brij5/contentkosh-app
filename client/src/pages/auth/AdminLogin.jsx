import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser, clearAuthError } from '../../store/actions/authActions';
import { selectAuthLoading, selectAuthError, selectIsAdmin, selectIsAuthenticated } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

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

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textColorLight};
  margin-bottom: 2rem;
  font-size: 1rem;
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

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAdmin = useSelector(selectIsAdmin);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Clear any existing auth errors when component mounts
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if already authenticated as admin
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated && !isAdmin) {
      // If authenticated but not admin, show error and logout
      toast.error('You do not have admin privileges');
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
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
    // Clear field error when user starts typing
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
      const success = await dispatch(loginUser(formData));
      if (success) {
        // Check if user is admin after login
        const adminCheck = dispatch(selectIsAdmin);
        if (!adminCheck) {
          toast.error('You do not have admin privileges');
          return;
        }
        navigate('/admin/dashboard');
      }
    }
  };

  return (
    <Container>
      <Title>Admin Login</Title>
      <Subtitle>Please enter your credentials to access the admin dashboard</Subtitle>
      <Form onSubmit={handleSubmit}>
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

        {error && (
          <ErrorText role="alert">
            {error}
          </ErrorText>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login as Admin'}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;