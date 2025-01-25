import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSave, FaCog, FaEnvelope, FaKey, FaPalette } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textColorLight};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.primaryColor};
  color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryColorHover};
  }
`;

const ColorPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const ColorOption = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  background: ${({ color }) => color};
  cursor: pointer;
  border: 2px solid ${({ selected, theme }) => (selected ? theme.primaryColor : 'transparent')};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const SuccessMessage = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #10b981;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    emailService: 'gmail',
    emailApiKey: '',
    emailFromName: '',
    emailFromAddress: '',
    cloudinaryName: '',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    fontFamily: 'Inter'
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch settings');
      }

      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const colorOptions = [
    '#3B82F6',
    '#10B981',
    '#8B5CF6',
    '#EF4444',
    '#F59E0B',
    '#6B7280',
    '#EC4899',
    '#14B8A6'
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title>Settings</Title>

      {showSuccess && (
        <SuccessMessage>
          <FaSave /> Settings saved successfully
        </SuccessMessage>
      )}

      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionHeader>
            <FaCog />
            <SectionTitle>General Settings</SectionTitle>
          </SectionHeader>

          <FormGroup>
            <Label>Site Name</Label>
            <Input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Site Description</Label>
            <Input
              type="text"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Contact Email</Label>
            <Input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionHeader>
            <FaEnvelope />
            <SectionTitle>Email Settings</SectionTitle>
          </SectionHeader>

          <FormGroup>
            <Label>Email Service</Label>
            <Select name="emailService" value={settings.emailService} onChange={handleChange}>
              <option value="gmail">Gmail</option>
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Email API Key</Label>
            <Input
              type="password"
              name="emailApiKey"
              value={settings.emailApiKey}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>From Name</Label>
            <Input
              type="text"
              name="emailFromName"
              value={settings.emailFromName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>From Email Address</Label>
            <Input
              type="email"
              name="emailFromAddress"
              value={settings.emailFromAddress}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionHeader>
            <FaKey />
            <SectionTitle>API Keys</SectionTitle>
          </SectionHeader>

          <FormGroup>
            <Label>Cloudinary Cloud Name</Label>
            <Input
              type="text"
              name="cloudinaryName"
              value={settings.cloudinaryName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Cloudinary API Key</Label>
            <Input
              type="password"
              name="cloudinaryApiKey"
              value={settings.cloudinaryApiKey}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Cloudinary API Secret</Label>
            <Input
              type="password"
              name="cloudinaryApiSecret"
              value={settings.cloudinaryApiSecret}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionHeader>
            <FaPalette />
            <SectionTitle>Appearance</SectionTitle>
          </SectionHeader>

          <FormGroup>
            <Label>Primary Color</Label>
            <ColorPicker>
              {colorOptions.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={settings.primaryColor === color}
                  onClick={() =>
                    handleChange({
                      target: { name: 'primaryColor', value: color }
                    })
                  }
                />
              ))}
            </ColorPicker>
          </FormGroup>

          <FormGroup>
            <Label>Secondary Color</Label>
            <ColorPicker>
              {colorOptions.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={settings.secondaryColor === color}
                  onClick={() =>
                    handleChange({
                      target: { name: 'secondaryColor', value: color }
                    })
                  }
                />
              ))}
            </ColorPicker>
          </FormGroup>

          <FormGroup>
            <Label>Font Family</Label>
            <Select name="fontFamily" value={settings.fontFamily} onChange={handleChange}>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
            </Select>
          </FormGroup>
        </Section>

        <Button type="submit">
          <FaSave /> Save Settings
        </Button>
      </Form>
    </Container>
  );
};

export default Settings;
