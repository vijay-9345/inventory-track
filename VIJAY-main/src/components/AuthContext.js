import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const login = () => {
    localStorage.setItem('loggedIn', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
