import { createContext, useState, useCallback, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('a1_admin_token'));
  const [username, setUsername] = useState(() => localStorage.getItem('a1_admin_user'));

  const login = useCallback((newToken, newUsername) => {
    localStorage.setItem('a1_admin_token', newToken);
    localStorage.setItem('a1_admin_user', newUsername);
    setToken(newToken);
    setUsername(newUsername);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('a1_admin_token');
    localStorage.removeItem('a1_admin_user');
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};