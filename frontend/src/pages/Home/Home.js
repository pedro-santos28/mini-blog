import React from 'react';
import { Link } from 'react-router-dom';
import CardPost from '../../components/Card/Card';
import './Home.css';
import { useAuthContext } from '../../context/AuthContext';

const Home = () => {
  const { authentication, posts } = useAuthContext();

  return (
    <div className="container">
      {authentication ? (
        <>
          <h1 className="title">Feed</h1>
          <div className="card">
            {posts?.map((item) => (
              <div className="content" key={item.id}>
                <CardPost
                  title={
                    <Link to={`/post-details/${item.id}`}>{item.title}</Link>
                  }
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  createdAt={item.createdAt}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>Realize login para ver os posts </h1>
        </>
      )}
    </div>
  );
};

export default Home;
