// Light theme configuration
const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#5AC8FA',
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C7C7CC',
    divider: '#E5E5EA'
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  },
  zIndex: {
    modal: 1000,
    dropdown: 900,
    header: 800,
    footer: 700
  }
};

// Dark theme configuration
const darkTheme = {
  colors: {
    primary: '#1DA1F2',
    secondary: '#FF5722',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#03A9F4',
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0BEC5',
    border: '#424242',
    divider: '#2C2C2C'
  },
  ...lightTheme.typography,
  ...lightTheme.spacing,
  ...lightTheme.breakpoints,
  ...lightTheme.shadows,
  ...lightTheme.transitions,
  ...lightTheme.zIndex
};

export { lightTheme, darkTheme };