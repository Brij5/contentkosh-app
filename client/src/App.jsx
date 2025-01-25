import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import AppRoutes from './routes';

// Redux Store
import { store } from './store';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <GlobalStyles />
            <AppRoutes />
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;