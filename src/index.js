import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./theme";

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  <React.StrictMode>
    {/* Apply global styles */}
    <GlobalStyles />
    {/* Render the main App component */}
    <App />
  </React.StrictMode>
);

// Register the service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered: ", registration);
      })
      .catch((error) => {
        console.log("Service Worker registration failed: ", error);
      });
  });
}