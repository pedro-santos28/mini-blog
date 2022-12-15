import { useForm } from 'react-hook-form';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useFetch from '../../hooks/useFetch';

const schema = yup.object().shape({
  title: yup.string().required('O campo title é obrigatório'),
  category: yup.string().required('O campo category é obrigatório'),
  description: yup.string().required('O campo description é obrigatório'),
});

const url = 'https://localhost:7109/create-post';

const CreatePost = () => {
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
    const post = {
      Title: data.title,
      Category: data.category,
      Description: data.description,
      Image: data.image,
    };

    console.log(post);

    requestConfig(post, 'POST');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Crie um novo post</h3>
      <p>Compartilhe suas melhores ideias com a comunidade de usuários</p>
      <label>
        <span>Titulo</span>
        <input placeholder="title" {...register('title')} />
        <p className={errors.title ? styles.erro : ''}>
          {errors.title?.message}
        </p>
      </label>

      <label>
        <span>Categoria</span>
        <input
          type="text"
          placeholder="Informe a category do seu post"
          {...register('category')}
        />
        <p className={errors.category ? styles.erro : ''}>
          {errors.category?.message}
        </p>
      </label>

      <label>
        <span>Descrição </span>
        <textarea
          placeholder="Descreva aqui seu post"
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

export default CreatePost;
