import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useFetch = (url) => {
  const [dataResponse, setDataResponse] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [itemId, setItemId] = useState('');
  const [PostActionState, setPostActionState] = useState('');
  const navigate = useNavigate();
  //   const [callFetch, setCallFetch] = useState('');

  // Funções
  const requestConfig = (content, method, PostActionState) => {
    setMethod(method);
    setPostActionState(PostActionState);

    if (method == 'POST') {
      setConfig({
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(content),
      });
    } else if (method == 'DELETE') {
      setConfig({
        method,
        headers: { 'content-type': 'application/json' },
      });
      setItemId(content);
    } else if (method == 'PUT') {
      setConfig({
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(content),
      });
      setItemId(content.id);
    }
  };

  useEffect(() => {
    const httpRequest = async () => {
      // GET METHOD
      if (method === 'GET') {
        setLoading(true);
        try {
          const response = await fetch(url);
          const responseJson = await response.json();
          setDataResponse(responseJson);
        } catch (error) {
          console.log(error);
          setError('Houve um erro ao exibir os dados');
        }
        setLoading(false);
      }

      // POST METHOD
      else if (method === 'POST' && PostActionState === 'signin') {
        const response = await fetch(url, config);
        if (response.ok) {
          toast.success('Logado com sucesso!');
          navigate('/');
        } else {
          toast.error('Credenciais inválidas!');
        }
      } else if (method === 'POST' && PostActionState === 'signup') {
        const response = await fetch(url, config);
        console.log(response);
        if (response.ok) {
          toast.success('Conta criada com sucesso!');
          navigate('/login');
        } else {
          toast.error('Dados inválidos!');
        }
      }

      // DELETE METHOD
      else if (method === 'DELETE') {
        const deleteUrl = `${url}/${itemId}`;
        const response = await fetch(deleteUrl, config);
      }

      // PUT METHOD
      else if (method === 'PUT') {
        const editUrl = `${url}/${itemId}`;
        const fetchOptions = [editUrl, config];
        const response = await fetch(...fetchOptions);
        const responseJson = await response.json();
        setCallFetch(responseJson);
      }
    };
    httpRequest();
  }, [config, method]);

  return { dataResponse, requestConfig, loading, error };
};

export default useFetch;
