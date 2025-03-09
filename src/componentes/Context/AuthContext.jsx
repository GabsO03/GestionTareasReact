import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggeado, setLoggeado] = useState(() => localStorage.getItem('loggeado') === 'true');

  const login = () => {
    setLoggeado(true);
    localStorage.setItem('loggeado', 'true');
  };

  const logout = () => {
    setLoggeado(false);
    localStorage.removeItem('loggeado');
  };

  return (
    <AuthContext.Provider value={{ loggeado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
