import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
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

const Links = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  a {
    color: ${({ theme }) => theme.primaryColor};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError('');
        await authAPI.forgotPassword(values.email);
        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to send reset email');
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
        <Subtitle>Enter your email to receive reset instructions</Subtitle>

        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              icon={<FiMail />}
              {...formik.getFieldProps('email')}
              error={formik.touched.email && formik.errors.email}
              disabled={success}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              <FiCheckCircle />
              Reset instructions sent to your email
            </SuccessMessage>
          )}

          <Button type="submit" loading={isLoading} disabled={success}>
            {success ? 'Email Sent' : 'Send Reset Link'}
          </Button>

          <Links>
            <Link to="/auth/login">Back to Sign In</Link>
          </Links>
        </Form>
      </FormCard>
    </Container>
  );
};

export default ForgotPassword; 