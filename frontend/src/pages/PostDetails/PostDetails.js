import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchPost from '../../hooks/PostRelated/useFetchPost';
import CardPost from '../../components/Card/Card';
import { api } from '../../utils/url';
import styles from './PostDetails.module.css';

const PostDetails = () => {
  const { postId } = useParams();

  const {
    dataResponse: post,
    requestConfig,
    loading,
    error,
  } = useFetchPost(api + '/post/' + postId);

  useEffect(() => {
    requestConfig('', 'GET');
  }, []);

  console.log('POST ID:' + postId);
  console.log(post);

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}

      {post && (
        <CardPost
          category={post.category}
          title={post.title}
          description={post.description}
          image={post.image}
          createdAt={post.createdAt}
        ></CardPost>
      )}
    </div>
  );
};

export default PostDetails;
