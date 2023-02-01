import { useContext, useState, createContext, useEffect } from 'react';
import useSWR from 'swr';
import { api } from '../utils/url';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authentication, setAuthentication] = useState(false);
  const [JWTKey, setJWTKey] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('JWTKey');
    setJWTKey(storedValue);
    if (storedValue) {
      setAuthentication(true);
    }
  }, []);

  const fetcher = (...args) =>
    fetch(...args, { headers: { Authorization: `Bearer ${JWTKey}` } }).then(
      (res) => res.json()
    );

  const { data, error, isLoading, mutate } = useSWR(
    authentication ? `${api}/post` : null,
    fetcher
  );

  return (
    <AuthContext.Provider
      value={{
        authentication,
        setAuthentication,
        JWTKey,
        setJWTKey,
        posts: data,
        error,
        isLoading,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Erro no context');
  }

  return context;
}
