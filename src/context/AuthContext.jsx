// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { DEMO_USERS, ROLES } from '../data/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored =
      localStorage.getItem('lms-user') || sessionStorage.getItem('lms-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password, remember = false) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    const match = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!match) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }

    const userData = {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role,
      avatar: match.avatar,
      memberId: match.memberId,
      roleLabel: ROLES[match.role]?.label,
      permissions: ROLES[match.role]?.permissions || [],
    };

    setUser(userData);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('lms-user', JSON.stringify(userData));

    setIsLoading(false);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms-user');
    sessionStorage.removeItem('lms-user');
  };

  const register = async (data) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setIsLoading(false);
    return { success: true };
  };

  /** Check if current user has a specific permission */
  const can = (permission) => {
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        can,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isOperator: user?.role === 'operator',
        isUser: user?.role === 'user',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
