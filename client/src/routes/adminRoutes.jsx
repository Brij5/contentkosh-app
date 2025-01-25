import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminDashboard/AdminLayout';
import DashboardOverview from '../components/AdminDashboard/DashboardOverview';
import UserManagement from '../components/AdminDashboard/UserManagement';
import BlogManagement from '../components/AdminDashboard/BlogManagement';
import BlogForm from '../components/AdminDashboard/BlogForm';
import ServiceManagement from '../components/AdminDashboard/ServiceManagement';
import Settings from '../components/AdminDashboard/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with your auth logic
  const isAdmin = true; // Replace with your admin check logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const adminRoutes = {
  path: '/admin',
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardOverview />
    },
    {
      path: 'users',
      element: <UserManagement />
    },
    {
      path: 'blogs',
      children: [
        {
          index: true,
          element: <BlogManagement />
        },
        {
          path: 'new',
          element: <BlogForm />
        },
        {
          path: 'edit/:id',
          element: <BlogForm />
        }
      ]
    },
    {
      path: 'services',
      element: <ServiceManagement />
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
};

export default adminRoutes;
