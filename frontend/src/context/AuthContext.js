import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // --------------------
  // LOGIN
  // --------------------
  const login = async (credentials) => {
    try {
      setLoading(true);

      const res = await axios.post(
        'http://13.233.120.140:3001/api/auth/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Backend returns { user, token }
      setUser(res.data.user);

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
  };

  // --------------------
  // ROLE CHECK (FIXED)
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
        loading,
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
