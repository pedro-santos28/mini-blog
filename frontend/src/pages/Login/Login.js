import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Login.module.css';
import useFetchUser from '../../hooks/UserRelated/useFetchUser';
import { api } from '../../utils/url';
const Login = () => {
  const schema = yup.object().shape({
    nome: yup.string().required('O campo de nome é obrigatório'),
    senha: yup
      .string()
      .min(5, 'A senha deve ter no mínimo 5 caracteres')
      .required('O campo senha é obrigatório'),
  });

  // Hook user form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { requestConfig } = useFetchUser(api + '/signin');
  const onSubmit = (data) => {
    const body = {
      userName: data.nome,
      senha: data.senha,
    };

    requestConfig(body, 'POST', 'signin');
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <h3>Página de log-in</h3>
      <label>
        <span>Nome</span>
        <input
          type="text"
          placeholder="Digite seu nome"
          {...register('nome')}
        />
        <p className={errors.nome ? styles.erro : ''}>{errors.nome?.message}</p>
      </label>

      <label>
        <span>Senha</span>
        <input
          type="password"
          placeholder="Digite sua senha"
          {...register('senha')}
        />
        <p className={errors.senha ? styles.erro : ''}>
          {errors.senha?.message}
        </p>
      </label>

      <input type="submit" className="btn" value="Entrar" />
    </form>
  );
};

export default Login;
