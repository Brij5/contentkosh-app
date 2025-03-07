import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BlogPage from '../pages/BlogPage';
import BlogManagementPage from '../pages/BlogManagementPage';
import Unauthorized from '../pages/Unauthorized';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Routes */}
      <Route 
        path="/admin/blogs" 
        element={isAdmin ? <BlogManagementPage /> : <Unauthorized />} 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes; 