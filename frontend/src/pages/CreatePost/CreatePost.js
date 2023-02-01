import React from 'react';
import useFetchPost from '../../hooks/PostRelated/useFetchPost';
import { api } from '../../utils/url';
import FormCreatePost from '../../components/CreateEditPost';

const CreatePost = () => {
  const { requestConfig } = useFetchPost(`${api}/post`);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const post = {
        Title: data.title,
        Category: data.category,
        Description: data.description,
        Image: data.image,
      };
      requestConfig(post, 'POST');
    } catch (err) {
      console.log(err);
    }
  };

  return <FormCreatePost onSubmit={onSubmit} title={'Criar novo post'} />;
};

export default CreatePost;
