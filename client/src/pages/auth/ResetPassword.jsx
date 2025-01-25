import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../store/actions/authActions';
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
  LinkText,
  PasswordRequirements
} from '../../components/shared/AuthStyles';

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });

  useEffect(() => {
    if (authError) {
      setFormErrors(prev => ({ ...prev, general: authError }));
    }
  }, [authError]);

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
      match: password && password === confirmPassword
    });
  }, [formData]);

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

  const validateForm = () => {
    const errors = {};
    const { password, confirmPassword } = formData;

    if (!password) {
      errors.password = 'Password is required';
    } else if (!Object.values(validations).every(Boolean)) {
      errors.password = 'Password does not meet all requirements';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await dispatch(resetPassword(token, formData.password)).unwrap();
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setFormErrors({
        general: err.message || 'Failed to reset password. Please try again.'
      });
    }
  };

  if (success) {
    return (
      <Container>
        <SuccessText>
          Your password has been successfully reset.
          You will be redirected to the login page shortly.
        </SuccessText>
        <LinkText to="/login">
          Click here to login now
        </LinkText>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Reset Password</Title>
      <Subtitle>
        Please enter your new password below.
      </Subtitle>

      <Form onSubmit={handleSubmit} noValidate>
        {formErrors.general && (
          <ErrorText role="alert">
            {formErrors.general}
          </ErrorText>
        )}

        <FormGroup>
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            disabled={isLoading}
            aria-invalid={!!formErrors.password}
            aria-describedby="password-requirements"
            autoComplete="new-password"
            required
          />
          <PasswordRequirements id="password-requirements">
            <li className={validations.length ? 'valid' : ''}>
              At least 8 characters long
            </li>
            <li className={validations.uppercase ? 'valid' : ''}>
              At least one uppercase letter
            </li>
            <li className={validations.lowercase ? 'valid' : ''}>
              At least one lowercase letter
            </li>
            <li className={validations.number ? 'valid' : ''}>
              At least one number
            </li>
            <li className={validations.special ? 'valid' : ''}>
              At least one special character (!@#$%^&*)
            </li>
            <li className={validations.match ? 'valid' : ''}>
              Passwords match
            </li>
          </PasswordRequirements>
          {formErrors.password && (
            <ErrorText role="alert">
              {formErrors.password}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
            disabled={isLoading}
            aria-invalid={!!formErrors.confirmPassword}
            autoComplete="new-password"
            required
          />
          {formErrors.confirmPassword && (
            <ErrorText role="alert">
              {formErrors.confirmPassword}
            </ErrorText>
          )}
        </FormGroup>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </Button>

        <LinkText to="/login">
          Return to Login
        </LinkText>
      </Form>
    </Container>
  );
};

export default ResetPassword; 