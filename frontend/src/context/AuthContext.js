import { useContext, useState, createContext, useEffect } from 'react';
import useSWR from 'swr';
import { api } from '../utils/url';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authentication, setAuthentication] = useState(false);
  const [JWTKey, setJWTKey] = useState('');

  const fetcher = (...args) =>
    fetch(...args, { headers: { Authorization: `Bearer ${JWTKey}` } }).then(
      (res) => res.json()
    );

  const { data, error, isLoading, mutate } = useSWR(
    authentication ? `${api}/post` : null,
    fetcher
  );

  useEffect(() => {
    const storedValue = localStorage.getItem('JWTKey');

    if (storedValue) {
      setAuthentication(true);
      console.log('logado');
      console.log(authentication);
    }
  }, []);
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
