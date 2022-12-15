import { useContext, useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authentication, setAuthentication] = useState(false);
  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Erro no context');
  }

  return context;
}
