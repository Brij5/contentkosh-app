import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLock, FiCheckCircle } from 'react-icons/fi';
import { authAPI } from '../../services/api';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
`;

const FormCard = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadowMd};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textColorLight};
  text-align: center;
  margin-bottom: 2rem;
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
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.errorColor};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.successColor};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 0.25rem;
`;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError('');
        await authAPI.resetPassword(token, values.password);
        setSuccess(true);
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to reset password');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Reset Password</Title>
        <Subtitle>Enter your new password</Subtitle>

        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              icon={<FiLock />}
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password}
              disabled={success}
            />
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              icon={<FiLock />}
              {...formik.getFieldProps('confirmPassword')}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              disabled={success}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              <FiCheckCircle />
              Password reset successful. Redirecting to login...
            </SuccessMessage>
          )}

          <Button type="submit" loading={isLoading} disabled={success}>
            {success ? 'Password Reset' : 'Reset Password'}
          </Button>
        </Form>
      </FormCard>
    </Container>
  );
};

export default ResetPassword; 