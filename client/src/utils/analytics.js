import ReactGA from 'react-ga4';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID;

if (!trackingId) {
  console.error('Google Analytics tracking ID is not set. Analytics will not work.');
} else {
  ReactGA.initialize(trackingId, {
    testMode: process.env.NODE_ENV === 'test',
    debug: process.env.NODE_ENV === 'development'
  });
}

export const logPageView = () => {
  if (trackingId) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.send('pageview');
  }
};

export const logEvent = (category = '', action = '', label = '') => {
  if (trackingId && category && action) {
    ReactGA.event({ category, action, label });
  }
};
