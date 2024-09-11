import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './providers/authProvider/authProvider';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
);
