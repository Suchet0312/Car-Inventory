import React, { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('access_token');
    return t ? parseJwt(t) : null;
  });

  const login = useCallback(async (email, password) => {
    const data = await authAPI.login(email, password);
    const payload = parseJwt(data.access_token);
    localStorage.setItem('access_token', data.access_token);
    setToken(data.access_token);
    setUser(payload);
    return payload;
  }, []);

  const register = useCallback(async (email, password) => {
    return authAPI.register(email, password);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAdmin, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
