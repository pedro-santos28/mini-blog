import React from 'react';
import styles from './index.module.css';
import { useAuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import EditModal from '../../components/EditModal';
import DeleteModal from '../../components/DeleteModal';

const index = () => {
  const { posts, isLoading } = useAuthContext();

  if (isLoading) {
    return <p>Carregando</p>;
  }

  return (
    <>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Posts</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {posts.map((post) => {
            return (
              <tr className={styles.row} key={post?.id}>
                <>
                  <td>
                    <NavLink to={`/post-details/${post.id}`}>
                      {post?.title}
                    </NavLink>
                  </td>
                  <td>
                    <EditModal id={post.id} />
                  </td>
                  <td>
                    <DeleteModal id={post.id} />
                  </td>
                </>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default index;
