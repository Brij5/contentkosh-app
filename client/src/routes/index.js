import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default AppRoutes; 