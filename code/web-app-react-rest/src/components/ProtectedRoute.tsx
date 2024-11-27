import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulated authentication check
const isAuthenticated = (): boolean => {
    // Replace with actual authentication logic
    return !!localStorage.getItem('authToken'); // Example: Check for an auth token in localStorage
};

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
