import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/actions/authActions';
import { selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import {
  Container,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorText,
  SuccessText,
  LinkText
} from '../../components/shared/AuthStyles';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const result = await dispatch(forgotPassword(email)).unwrap();
      if (result) {
        setSuccess(true);
        setEmail('');
      }
    } catch (err) {
      setError(err.message || 'Failed to send reset instructions. Please try again.');
    }
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <Subtitle>
        Enter your email address and we'll send you instructions to reset your password.
      </Subtitle>

      {success ? (
        <>
          <SuccessText>
            Password reset instructions have been sent to your email.
            Please check your inbox and spam folder.
          </SuccessText>
          <Button variant="secondary" onClick={() => setSuccess(false)}>
            Send Another Reset Link
          </Button>
          <LinkText to="/login">
            Return to Login
          </LinkText>
        </>
      ) : (
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              error={error}
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={error ? 'email-error' : undefined}
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
            {error && (
              <ErrorText id="email-error" role="alert">
                {error}
              </ErrorText>
            )}
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
          </Button>

          <LinkText to="/login">
            Remember your password? Log in
          </LinkText>
        </Form>
      )}
    </Container>
  );
};

export default ForgotPassword; 