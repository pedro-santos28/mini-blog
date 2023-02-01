import { useForm } from 'react-hook-form';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './CreatePost.module.css';

const index = ({ onSubmit, title }) => {
  const schema = yup.object().shape({
    title: yup.string().required('O campo Titulo é obrigatório'),
    category: yup.string().required('O campo Categoria é obrigatório'),
    description: yup.string().required('O campo Descrição é obrigatório'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data, e) => onSubmit(data, e))}
      encType="multipart/form-data"
    >
      <h3>{title}</h3>
      <label>
        <span>Titulo</span>
        <input placeholder="Digite o titulo" {...register('title')} />
        <p className={errors.title ? styles.erro : ''}>
          {errors.title?.message}
        </p>
      </label>
      <label>
        <span>Categoria</span>
        <input
          type="text"
          placeholder="Digite a categoria"
          {...register('category')}
        />
        <p className={errors.category ? styles.erro : ''}>
          {errors.category?.message}
        </p>
      </label>
      <label>
        <span>Descrição</span>
        <textarea
          placeholder="Descreva o conteudo do post"
          {...register('description')}
        />
        <p className={errors.description ? styles.erro : ''}>
          {errors.description?.message}
        </p>
      </label>
      <label>
        <span>Imagem</span>
        <input type="file" {...register('image')} />
        <p className={errors.image ? styles.erro : ''}>
          {errors.image?.message}
        </p>
      </label>
      <input className="btn" type="submit" />
    </form>
  );
};

export default index;
