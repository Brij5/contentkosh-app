import React, { Suspense } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import HeroSection from '../components/HeroSection/HeroSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import AboutSection from '../components/AboutSection/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import ContactSection from '../components/ContactSection/ContactSection';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { useData } from '../hooks/useData';
import ApiService from '../services/api';

// Use dynamic import with error boundary
const BlogsSection = React.lazy(() =>
  import('../components/BlogsSection/BlogsSection').catch((error) => {
    console.error('Error loading BlogsSection:', error);
    return { default: () => <ErrorMessage message="Failed to load blog section" /> };
  })
);

const HomePage = () => {
  const { theme } = useTheme();
  const {
    data: services,
    loading: servicesLoading,
    error: servicesError
  } = useData(ApiService.getServices);

  const { data: testimonials, loading: testimonialsLoading } = useData(ApiService.getTestimonials);
  const { data: blogs, loading: blogsLoading } = useData(ApiService.getBlogs);
  const { data: teamMembers, loading: teamMembersLoading } = useData(ApiService.getTeamMembers);

  if (servicesLoading || testimonialsLoading || blogsLoading || teamMembersLoading) {
    return <LoadingSpinner />;
  }

  if (servicesError) {
    return <ErrorMessage message={servicesError} />;
  }

  if (!services || !testimonials || !blogs || !teamMembers) {
    return <ErrorMessage message="Failed to load content" />;
  }

  return (
    <>
      <HeroSection theme={theme} />
      <ServicesSection services={services} theme={theme} />
      <AboutSection teamMembers={teamMembers} theme={theme} />
      <TestimonialsSection testimonials={testimonials} theme={theme} />
      <ContactSection theme={theme} />
      <Suspense fallback={<LoadingSpinner />}>
        <BlogsSection blogs={blogs} theme={theme} />
      </Suspense>
    </>
  );
};

export default HomePage;
