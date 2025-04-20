import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);

  const signUp = (email: string, password: string) => {
    if (users.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    setUsers([...users, { email, password }]);
  };

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser({ email: user.email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
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