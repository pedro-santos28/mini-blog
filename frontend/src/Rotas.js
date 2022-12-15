import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import CreatePost from './pages/CreatePost/CreatePost';
const Rotas = () => {
  const { authentication } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-post"
          element={authentication ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={authentication ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default Rotas;
