import React, { useState } from "react";
import {
  StyledContactSection,
  StyledContactTitle,
  StyledContactForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  StyledSubmitButton,
} from "./ContactSection.styled";

const ContactSection = ({ theme }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <StyledContactSection theme={theme}>
      <StyledContactTitle>Contact Us</StyledContactTitle>
      <StyledContactForm onSubmit={handleSubmit}>
        <StyledFormGroup>
          <StyledLabel>Name</StyledLabel>
          <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel>Email</StyledLabel>
          <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </StyledFormGroup>
        <StyledFormGroup>
          <StyledLabel>Message</StyledLabel>
          <StyledTextarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </StyledFormGroup>
        <StyledSubmitButton type="submit">Send Message</StyledSubmitButton>
        {submitted && <p>Thank you! Your message has been sent.</p>}
      </StyledContactForm>
    </StyledContactSection>
  );
};

export default ContactSection;
