import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard';
import { useAuthContext } from './context/AuthContext';
import CreatePost from './pages/CreatePost/CreatePost';
import PostDetails from './pages/PostDetails/PostDetails';
import ProtectedRoute from './utils/ProtectedRoute';

const Rotas = () => {
  const { authentication } = useAuthContext();
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute authentication={authentication} />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post-details/:postId" element={<PostDetails />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              authentication={authentication}
              route={'/'}
              loginCheck={true}
            />
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default Rotas;
