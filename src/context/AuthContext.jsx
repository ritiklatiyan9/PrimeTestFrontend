import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on component mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', credentials, {
        withCredentials: true
      });

      const { accessToken, user } = response.data.data;
      
      // Save to state
      setUser(user);
      setAccessToken(accessToken);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);

      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Clear state
      setUser(null);
      setAccessToken(null);
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');

      return true;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        accessToken,
        login, 
        logout,
        isAuthenticated: !!user && !!accessToken,
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};