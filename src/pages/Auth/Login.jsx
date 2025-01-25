import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
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

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(loginStart());
        const response = await authAPI.login(values);
        dispatch(loginSuccess(response.data));
        navigate('/admin');
      } catch (err) {
        dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
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
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your account</Subtitle>

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
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              icon={<FiLock />}
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            )}
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" loading={isLoading}>
            Sign In
          </Button>

          <Links>
            <Link to="/auth/forgot-password">Forgot password?</Link>
            <Link to="/auth/register">Don't have an account?</Link>
          </Links>
        </Form>
      </FormCard>
    </Container>
  );
};

export default Login; 