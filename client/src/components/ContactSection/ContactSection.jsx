import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.cardBackground};
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.9;
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
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin-top: 1rem;
`;

const ContactSection = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form and show success message
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <Section id="contact" theme={theme}>
      <Container>
        <Title theme={theme}>Get in Touch</Title>
        <Description theme={theme}>
          Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </Description>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label theme={theme}>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              theme={theme}
            />
          </FormGroup>
          <FormGroup>
            <Label theme={theme}>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              theme={theme}
            />
          </FormGroup>
          <FormGroup>
            <Label theme={theme}>Message</Label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              theme={theme}
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={isSubmitting} theme={theme}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </Form>
        {isSubmitted && (
          <SuccessMessage>Thank you for your message! We'll get back to you soon.</SuccessMessage>
        )}
      </Container>
    </Section>
  );
};

ContactSection.propTypes = {
  theme: PropTypes.object.isRequired
};

export default ContactSection;
