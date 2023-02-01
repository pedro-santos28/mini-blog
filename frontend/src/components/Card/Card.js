import styles from './Card.module.css';
import notFound from '../../assets/404image.jpg';

function CardPost({ category, title, description, image, createdAt }) {
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        {category ? (
          <h1 className={styles.title}>{category}</h1>
        ) : (
          <h1>Sem categoria</h1>
        )}
      </div>
      <h2 className={styles.title}>{title && title}</h2>
      <p>{description}</p>
      {image ? <img src={`/uploads/${image}`} /> : <img src={notFound} />}
      <p>Criado em {createdAt}</p>
    </div>
  );
}

export default CardPost;
