import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password, role = 'patient') => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name: 'Baqir Rizvi',
      email,
      phone: '+92 300 1234567',
      address: '123 Main Street, Apt 4B',
      avatar: null,
      role,
    });
    setIsLoading(false);
    return true;
  };

  const register = async (name, email, phone, password, role = 'patient') => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name,
      email,
      phone,
      address: '',
      avatar: null,
      role,
    });
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
