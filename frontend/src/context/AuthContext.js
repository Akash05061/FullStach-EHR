import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// 🔧 Create axios instance
const api = axios.create({
  baseURL: 'http://15.206.73.100:3001/api'
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------
  // LOAD AUTH FROM STORAGE (IMPORTANT)
  // --------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('ehr_user');
    const storedToken = localStorage.getItem('ehr_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // --------------------
  // LOGIN
  // --------------------
  const login = async (credentials) => {
    try {
      setLoading(true);

      const res = await api.post('/auth/login', credentials);

      const { user, token } = res.data;

      // store
      localStorage.setItem('ehr_user', JSON.stringify(user));
      localStorage.setItem('ehr_token', token);

      // set state
      setUser(user);
      setToken(token);

      // attach token to axios
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return {
        success: false,
        error: err.response?.data?.error || 'Login failed'
      };
    } finally {
      setLoading(false);
    }
  };

  // --------------------
  // LOGOUT
  // --------------------
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('ehr_user');
    localStorage.removeItem('ehr_token');

    delete api.defaults.headers.common['Authorization'];
  };

  // --------------------
  // ROLE CHECK
  // --------------------
  const hasRole = (roles = []) => {
    if (!user) return false;
    if (!Array.isArray(roles)) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        hasRole,
        api // 🔥 expose api for components
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
