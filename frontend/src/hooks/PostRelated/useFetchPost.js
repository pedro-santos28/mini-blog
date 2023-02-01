import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const useFetch = (url) => {
  const [dataResponse, setDataResponse] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { JWTKey, mutate, authentication } = useAuthContext();
  const navigate = useNavigate();

  // Funções
  const requestConfig = (content, method) => {
    setMethod(method);

    if (method === 'GET') {
      setConfig({
        method,
        headers: {
          Authorization: `Bearer ${JWTKey}`,
        },
      });
    } else if (method == 'POST') {
      const formData = new FormData();
      formData.append('Title', content.Title);
      formData.append('Category', content.Category);
      formData.append('Description', content.Description);
      formData.append('Image', content.Image[0]);

      setConfig({
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${JWTKey}`,
        },
      });
    } else if (method === 'DELETE') {
      setConfig({
        method,
        headers: {
          Authorization: `Bearer ${JWTKey}`,
        },
      });
    } else if (method === 'PUT') {
      const formData = new FormData();
      formData.append('Title', content.Title);
      formData.append('Category', content.Category);
      formData.append('Description', content.Description);
      formData.append('Image', content.Image[0]);
      setConfig({
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${JWTKey}`,
        },
      });
    }
  };

  useEffect(() => {
    const httpRequest = async () => {
      if (method === 'GET') {
        setLoading(true);
        try {
          const response = await fetch(url, config);
          const responseJson = await response.json();
          setDataResponse(responseJson);
        } catch (error) {
          console.log(error);
          setError('Houve um erro ao exibir os dados');
        }
        setLoading(false);
      } else if (method === 'POST') {
        try {
          const response = await fetch(url, config);
          console.log(authentication);
          console.log(response.ok);
          if (response.ok) {
            toast.success('Post criado com sucesso!');
            mutate();
            navigate('/');
          } else {
            toast.error('Erro ao criar post!');
          }
        } catch (err) {
          console.log(err);
        }
      } else if (method === 'PUT') {
        const response = await fetch(url, config);
        if (response.ok) {
          toast.success('Post editado com sucesso!');
          mutate();
          navigate('/');
        } else {
          toast.error('Erro ao editar post!');
        }
      } else if (method === 'DELETE') {
        const response = await fetch(url, config);
        setDataResponse(response);
        toast.success('Post excluido com sucesso!');
        mutate();
      }
    };
    httpRequest();
  }, [config, method]);

  return { dataResponse, requestConfig, loading, error };
};

export default useFetch;
