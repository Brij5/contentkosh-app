import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();