import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

test('renders ContentKosh header', () => {
  render(
    <ThemeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  );
  const headerElement = screen.getByText(/ContentKosh/i);
  expect(headerElement).toBeInTheDocument();
});
