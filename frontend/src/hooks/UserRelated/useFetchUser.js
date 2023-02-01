import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const useFetch = (url) => {
  const { setAuthentication, JWTKey, setJWTKey } = useAuthContext();
  const [dataResponse, setDataResponse] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [PostActionState, setPostActionState] = useState('');
  const navigate = useNavigate();

  // Funções
  const requestConfig = (content, method, PostActionState) => {
    setMethod(method);
    setPostActionState(PostActionState);
    if (method == 'POST') {
      setConfig({
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(content),
      });
    } else if (method == 'DELETE') {
      setConfig({
        method,
        headers: { 'content-type': 'application/json' },
      });
    } else if (method == 'PUT') {
      setConfig({
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(content),
      });
    }
  };

  useEffect(() => {
    const httpRequest = async () => {
      if (method === 'POST' && PostActionState === 'signin') {
        const response = await fetch(url, config);
        const responseJson = await response.json();
        localStorage.setItem('JWTKey', responseJson.value);
        setJWTKey(responseJson.value);
        JWTKey && console.log('JWT: ', JWTKey);
        if (response.ok) {
          setAuthentication(true);
          toast.success('Logado com sucesso!');
          navigate('/');
        } else {
          toast.error('Credenciais inválidas!');
        }
      } else if (method === 'POST' && PostActionState === 'signup') {
        const response = await fetch(url, config);
        if (response.ok) {
          toast.success('Usuário criado com sucesso!');
          navigate('/login');
        } else {
          toast.error('Dados inválidos!');
        }
      }
    };
    httpRequest();
  }, [config, method]);

  return { dataResponse, requestConfig, loading, error };
};

export default useFetch;
