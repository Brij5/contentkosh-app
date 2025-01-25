import React, { Suspense } from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../../components/ErrorBoundary';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturesSection from './sections/FeaturesSection';

const BlogsSection = React.lazy(() => import('../../components/BlogsSection/BlogsSection'));

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const LoadingFallback = styled.div`
  padding: 4rem 0;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
`;

const SectionErrorFallback = ({ error, resetErrorBoundary }) => (
  <div
    role="alert"
    aria-live="polite"
    style={{ 
      padding: '4rem 0',
      textAlign: 'center',
      color: '#666'
    }}
  >
    <h3 style={{ marginBottom: '1rem', color: '#dc3545' }}>
      Something went wrong
    </h3>
    <p style={{ marginBottom: '1rem' }}>
      {error.message || 'An unexpected error occurred. Please try again.'}
    </p>
    <button 
      onClick={resetErrorBoundary}
      type="button"
      aria-label="Try loading the section again"
      style={{
        padding: '0.5rem 1rem',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Try again
    </button>
  </div>
);

const Home = () => {
  return (
    <Container>
      <ErrorBoundary 
        FallbackComponent={SectionErrorFallback}
        onReset={() => {
          // Additional reset logic if needed
        }}
      >
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary 
        FallbackComponent={SectionErrorFallback}
        onReset={() => {
          // Additional reset logic if needed
        }}
      >
        <FeaturesSection />
      </ErrorBoundary>

      <ErrorBoundary 
        FallbackComponent={SectionErrorFallback}
        onReset={() => {
          // Additional reset logic if needed
        }}
      >
        <Suspense fallback={
          <LoadingFallback>
            Loading blog posts...
          </LoadingFallback>
        }>
          <BlogsSection />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default Home; 