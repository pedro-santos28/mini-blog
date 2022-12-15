import { useForm } from 'react-hook-form';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Signup.module.css';
import useFetch from '../../hooks/useFetch';


const schema = yup.object().shape({
  nome: yup.string().required('O campo nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O campo e-mail é obrigatório'),
  senha: yup
    .string()
    .min(5, 'A senha deve ter no mínimo 5 caracteres')
    .required('O campo senha é obrigatório'),
  senhaConfirmacao: yup
    .string()
    .oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais')
    .required('O campo Confirmação de senha é obrigatório'),
});

const url = 'https://localhost:7109/signup';

const Signup = () => {
  // hook user fetch (responssável pelas requisições)
  const { dataResponse, requestConfig } = useFetch(url);

  // Hook user form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const user = {
      userName: data.nome,
      email: data.email,
      senha: data.senha,
      senhaConfirmacao: data.senhaConfirmacao,
    };
    console.log(data);
    requestConfig(user, 'POST', 'signup');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Cadastro de usuário</h3>
      <label>
        <span>Nome</span>
        <input placeholder="Digite seu nome" {...register('nome')} />
        <p className={errors.nome ? styles.erro : ''}>{errors.nome?.message}</p>
      </label>

      <label>
        <span>E-mail </span>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email', { required: true })}
        />
        <p className={errors.email ? styles.erro : ''}>
          {errors.email?.message}
        </p>
      </label>

      <label>
        <span>Senha </span>
        <input
          type="password"
          placeholder="Digite sua senha"
          {...register('senha', { required: true })}
        />
        <p className={errors.senha ? styles.erro : ''}>
          {errors.senha?.message}
        </p>
      </label>
      <label>
        <span>Confirmação de senha</span>
        <input
          type="password"
          placeholder="Digite sua senha novamente"
          {...register('senhaConfirmacao')}
        />
        <p className={errors.senhaConfirmacao ? styles.erro : ''}>
          {errors.senhaConfirmacao?.message}
        </p>
      </label>
      <input className="btn" type="submit" />
    </form>
  );
};

export default Signup;
