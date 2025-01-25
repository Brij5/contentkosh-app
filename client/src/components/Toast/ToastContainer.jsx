import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Toast from './Toast';

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Clean up toasts after their duration
    const timer = setInterval(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.timestamp + toast.duration > Date.now())
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Add a new toast
  const addToast = (toast) => {
    const id = Date.now();
    const newToast = {
      ...toast,
      id,
      timestamp: Date.now(),
      duration: toast.duration || 5000 // Default duration: 5 seconds
    };
    setToasts((currentToasts) => [...currentToasts, newToast]);
  };

  // Remove a specific toast
  const removeToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <Container>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </Container>
  );
};

export default ToastContainer; 