import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './index.module.css';
import EditFormPost from '../../components/CreateEditPost';
import useFetchPost from '../../hooks/PostRelated/useFetchPost';
import { api } from '../../utils/url';
import { Pencil, X } from 'phosphor-react';

const Modal = ({ id, title }) => {
  const { requestConfig } = useFetchPost(`${api}/post/${id}`);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const postEdited = {
        Title: data.title,
        Category: data.category,
        Description: data.description,
        Image: data.image,
      };
      requestConfig(postEdited, 'PUT');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className={styles.ButtonEdit}>
          <Pencil size={32} />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <EditFormPost onSubmit={onSubmit} title={'Editar post'} />
          <div
            style={{
              display: 'flex',
              gap: 25,
              justifyContent: 'flex-end',
            }}
          >
            <AlertDialog.Cancel asChild>
              <X className={styles.ButtonCancel} size={32} weight={'bold'} />
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Modal;
