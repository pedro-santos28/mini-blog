import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styles from './index.module.css';
import useFetchPost from '../../hooks/PostRelated/useFetchPost';
import { api } from '../../utils/url';
import { Trash } from 'phosphor-react';

const Modal = ({ id }) => {
  const { requestConfig } = useFetchPost(`${api}/post/${id}`);
  const handleDelete = async () => {
    requestConfig('', 'DELETE');
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className={styles.ButtonDelete}>
          <Trash size={32} />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            Tem certeza que deseja deletar esse post?
          </AlertDialog.Title>

          <div className={styles.btnContainer}>
            <div>
              <AlertDialog.Cancel asChild>
                <button className={styles.ButtonCancel}>Cancelar</button>
              </AlertDialog.Cancel>
            </div>

            <div>
              <AlertDialog.Action asChild>
                <button onClick={handleDelete} className={styles.ButtonConfirm}>
                  Confirmar
                </button>
              </AlertDialog.Action>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Modal;
